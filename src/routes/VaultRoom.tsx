import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useNFTGate } from '../hooks/useNFTGate';

// Track initialization globally to prevent StrictMode double-init
let jitsiInitialized = false;

export default function VaultRoom() {
  const containerRef = useRef<HTMLDivElement>(null);
  const jitsiApiRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { address } = useAccount();
  const { hasAccess, isLoading } = useNFTGate();
  
  const roomName = 'ricobenzia-vault-community';

  const userDisplayName = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : 'Guest';

  useEffect(() => {
    // Prevent duplicate initialization (synchronous check for React StrictMode)
    if (jitsiInitialized || jitsiApiRef.current) {
      return;
    }
    jitsiInitialized = true;
    
    if (!containerRef.current || !hasAccess) {
      jitsiInitialized = false;
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;

    script.onload = () => {
      if (!containerRef.current) return;
      
      // @ts-ignore
      const domain = import.meta.env.VITE_JITSI_DOMAIN || 'meet.jit.si';
      const options = {
        roomName: roomName,
        width: '100%',
        height: '100%',
        parentNode: containerRef.current,
        configOverwrite: {
          startWithAudioMuted: true,
          startWithVideoMuted: true,
          prejoinPageEnabled: true,
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
            'fodeviceselection', 'hangup', 'chat', 'settings', 'videoquality', 
            'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts', 'tileview',
            'select-background', 'participants-pane', 'toggle-camera'
          ],
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
        },
        userInfo: {
          displayName: userDisplayName,
        },
      };

      try {
        // @ts-ignore
        const api = new JitsiMeetExternalAPI(domain, options);
        jitsiApiRef.current = api;
        
        // Hide loading screen immediately - Jitsi has its own prejoin UI
        setIsLoaded(true);
        
        api.addEventListener('videoConferenceJoined', () => {
          console.log('Joined conference');
        });
      } catch (err) {
        console.error('Jitsi API error:', err);
      }
    };

    script.onerror = (err) => {
      console.error('Jitsi script load error:', err);
    };

    document.body.appendChild(script);

    return () => {
      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose();
        jitsiApiRef.current = null;
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      jitsiInitialized = false; // Reset on unmount
    };
  }, [hasAccess, roomName, userDisplayName]);

  // Access denied
  if (!hasAccess && !isLoading) {
    return (
      <div className="min-h-screen bg-space-dark flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-2xl bg-cosmic-purple/30 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-cosmic-purple-light" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-clean-white mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Access <span className="text-cosmic-purple-light">Denied</span>
          </h1>
          <p className="text-clean-white/60 mb-8">
            You need to hold the RicoBenzia Access NFT to enter the video room.
          </p>
          <Link to="/#vault">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-cosmic-purple to-vibrant-green text-space-dark font-bold"
            >
              Go Back
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-space-dark flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between px-6 py-4 bg-space-dark/95 border-b border-vibrant-green/20"
      >
        <div className="flex items-center gap-4">
          <Link to="/">
            <img 
              src="/assets/bunny-final.png" 
              alt="RicoBenzia" 
              className="h-10 w-auto"
            />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-clean-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              The <span className="text-vibrant-green">Vault</span>
            </h1>
            <p className="text-clean-white/50 text-sm">NFT Holders Video Room</p>
          </div>
        </div>
        
        <Link to="/#vault">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg bg-clean-white/5 border border-clean-white/10 text-clean-white hover:border-vibrant-green transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Exit Room
          </motion.button>
        </Link>
      </motion.header>

      {/* Jitsi Container */}
      <div className="flex-1 relative" style={{ minHeight: 'calc(100vh - 72px)' }}>
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-space-dark z-10">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-vibrant-green border-t-transparent rounded-full animate-spin mx-auto mb-6" />
              <p className="text-clean-white/60 text-lg">Loading video room...</p>
              <p className="text-clean-white/40 text-sm mt-2">Please allow camera/microphone access when prompted</p>
            </div>
          </div>
        )}
        <div ref={containerRef} className="absolute inset-0" />
      </div>
    </div>
  );
}
