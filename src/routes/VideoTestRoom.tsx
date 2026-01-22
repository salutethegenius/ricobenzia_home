import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { VideoSession } from '../components/VideoSession';
import { RecordingHistory } from '../components/RecordingHistory';

// Generate timestamp outside component to avoid impure function call during render
const generateTimestamp = () => Date.now();

export default function VideoTestRoom() {
  const { address, isConnected } = useAccount();
  const [showHistory, setShowHistory] = useState(false);
  const [sessionType, setSessionType] = useState<'group' | 'one_on_one'>('group');
  const [timestamp] = useState(() => generateTimestamp());
  
  // Generate a unique room name based on wallet address and type
  const roomName = address 
    ? `${sessionType}-${address.slice(0, 8)}-${timestamp.toString().slice(-6)}`
    : `test-${sessionType}-${timestamp}`;

  const userDisplayName = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : 'Guest';

  // Show connection prompt if wallet not connected
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-space-dark flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-2xl bg-electric-blue/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-clean-white mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Connect <span className="text-electric-blue">Wallet</span>
          </h1>
          <p className="text-clean-white/60 mb-8">
            Please connect your wallet to access video sessions and recording features.
          </p>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-electric-blue to-vibrant-green text-space-dark font-bold"
            >
              Go Home
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
        className="flex items-center justify-between px-6 py-4 bg-space-dark/95 border-b border-vibrant-green/20 relative z-10"
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
              Video Session <span className="text-vibrant-green">Test</span>
            </h1>
            <p className="text-clean-white/50 text-sm">Room: {roomName}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Session Type Toggle */}
          <div className="flex items-center gap-2 bg-clean-white/5 rounded-lg p-1 border border-clean-white/10">
            <button
              onClick={() => setSessionType('group')}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                sessionType === 'group'
                  ? 'bg-vibrant-green text-space-dark'
                  : 'text-clean-white/60 hover:text-clean-white'
              }`}
            >
              Group
            </button>
            <button
              onClick={() => setSessionType('one_on_one')}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                sessionType === 'one_on_one'
                  ? 'bg-vibrant-green text-space-dark'
                  : 'text-clean-white/60 hover:text-clean-white'
              }`}
            >
              1-on-1
            </button>
          </div>

          {/* History Toggle */}
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="px-4 py-2 rounded-lg bg-clean-white/5 border border-clean-white/10 text-clean-white hover:border-vibrant-green transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {showHistory ? 'Hide' : 'Show'} History
          </button>

          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-clean-white/5 border border-clean-white/10 text-clean-white hover:border-vibrant-green transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </motion.button>
          </Link>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        {/* Recording History Sidebar */}
        {showHistory && (
          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            className="absolute left-0 top-0 bottom-0 w-96 bg-space-dark/98 border-r border-vibrant-green/20 z-20 overflow-y-auto"
          >
            <div className="p-4 border-b border-vibrant-green/20">
              <h2 className="text-lg font-bold text-clean-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Recording History
              </h2>
            </div>
            <RecordingHistory roomName={roomName} recordingType={sessionType} />
          </motion.div>
        )}

        {/* Video Session */}
        <div className={showHistory ? 'ml-96' : ''} style={{ transition: 'margin-left 0.3s' }}>
          <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-clean-white/5 border border-clean-white/10 backdrop-blur-sm">
              <div className="w-3 h-3 rounded-full bg-vibrant-green animate-pulse" />
              <span className="text-clean-white/70 text-sm">Host: </span>
              <span className="text-vibrant-green font-medium">{userDisplayName}</span>
            </div>
            <div className="text-clean-white/50 text-sm">
              {sessionType === 'group' ? '👥 Group Session' : '💬 One-on-One Session'}
            </div>
          </div>
          <VideoSession
            roomName={roomName}
            recordingType={sessionType}
            userName={userDisplayName}
          />
        </div>
      </div>
    </div>
  );
}