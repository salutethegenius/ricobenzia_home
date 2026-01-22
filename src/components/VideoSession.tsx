import { useRef } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useVideoRecording } from '../hooks/useVideoRecording';
import { useAccount } from 'wagmi';

interface VideoSessionProps {
  roomName: string;
  recordingType: 'group' | 'one_on_one';
  userName?: string;
}

interface RecordingStatusPayload {
  on: boolean;
  status?: string;
  mode?: string;
}

// Jitsi API type (simplified - using unknown for external library types)
type JitsiAPI = {
  executeCommand: (command: string) => void;
  addListener: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener: (event: string, handler: (...args: unknown[]) => void) => void;
};

export function VideoSession({ roomName, recordingType, userName = 'Guest' }: VideoSessionProps) {
  const { address } = useAccount();
  const {
    isHost,
    isRecording,
    recordingId,
    startRecordingInDB,
    updateRecordingStatus,
    setIsRecording,
  } = useVideoRecording(roomName, recordingType);

  const apiRef = useRef<JitsiAPI | null>(null);

  const handleRecordingStatusChanged = async (payload: RecordingStatusPayload) => {
    const { on, status } = payload;

    if (on && status === 'on') {
      setIsRecording(true);
      
      if (!recordingId) {
        try {
          await startRecordingInDB();
        } catch (err) {
          console.error('Failed to start recording in DB:', err);
          if (apiRef.current) {
            apiRef.current.executeCommand('toggleRecording');
          }
          return;
        }
      }
      
      await updateRecordingStatus('recording');
    } else if (!on) {
      setIsRecording(false);
      await updateRecordingStatus('completed');
    }
  };

  const handleRecordingLinkReady = async (url: string) => {
    if (recordingId) {
      await updateRecordingStatus('completed', url);
    }
  };

  const getConfig = () => {
    return {
      startWithAudioMuted: false,
      startWithVideoMuted: false,
      enableRecording: isHost,
    };
  };

  const getInterfaceConfig = () => {
    const baseButtons = [
      'microphone', 'camera', 'closedcaptions', 'desktop',
      'fullscreen', 'fodeviceselection', 'hangup', 'profile',
      'settings', 'raisehand', 'videoquality', 'filmstrip',
      'invite', 'feedback', 'stats', 'shortcuts'
    ];

    if (isHost) {
      baseButtons.push('recording');
    }

    return {
      TOOLBAR_BUTTONS: baseButtons,
      SETTINGS_SECTIONS: ['devices', 'language', 'moderator', 'profile'],
      SHOW_JITSI_WATERMARK: false,
      DISABLE_DOMINANT_SPEAKER_INDICATOR: false,
      DISABLE_FOCUS_INDICATOR: false,
    };
  };

  return (
    <div className="w-full h-screen bg-space-dark">
      {!isHost && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p className="font-bold">Observer Mode</p>
          <p className="text-sm">Only the host can start recording sessions.</p>
        </div>
      )}

      {isRecording && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p className="font-bold flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            Recording in Progress
          </p>
        </div>
      )}

      <JitsiMeeting
        domain={import.meta.env.VITE_JITSI_DOMAIN}
        roomName={roomName}
        configOverwrite={getConfig()}
        interfaceConfigOverwrite={getInterfaceConfig()}
        userInfo={{
          displayName: userName || address || 'Guest',
          email: '',
        }}
        onApiReady={(api: JitsiAPI) => {
          apiRef.current = api;
          api.addListener('recordingStatusChanged', ((payload: unknown) => {
            handleRecordingStatusChanged(payload as RecordingStatusPayload);
          }) as (...args: unknown[]) => void);
          api.addListener('recordingLinkReady', ((url: unknown) => {
            handleRecordingLinkReady(url as string);
          }) as (...args: unknown[]) => void);
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = '100vh';
        }}
      />
    </div>
  );
}