import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useNFTGate } from '../hooks/useNFTGate';

export default function VaultRoom() {
  const { address } = useAccount();
  const { hasAccess, isLoading } = useNFTGate();
  
  const roomName = 'ricobenzia-vault-community';
  const jitsiUrl = `https://meet.jit.si/${roomName}`;

  const userDisplayName = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : 'Guest';

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
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-vibrant-green/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-electric-blue/10 rounded-full blur-3xl" />
      </div>

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
            Back to Site
          </motion.button>
        </Link>
      </motion.header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-lg"
        >
          {/* Video Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-24 h-24 rounded-3xl bg-gradient-to-br from-vibrant-green/20 to-electric-blue/20 border border-vibrant-green/30 flex items-center justify-center mx-auto mb-8"
          >
            <svg className="w-12 h-12 text-vibrant-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </motion.div>

          {/* Title */}
          <h2 
            className="text-3xl md:text-4xl font-bold text-clean-white mb-4"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            Ready to <span className="text-vibrant-green">Connect</span>?
          </h2>
          
          <p className="text-clean-white/60 mb-8 leading-relaxed">
            Join the exclusive RicoBenzia community video room. Connect with fellow NFT holders, 
            share insights, and be part of the conversation.
          </p>

          {/* User Info */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-clean-white/5 border border-clean-white/10 mb-8">
            <div className="w-3 h-3 rounded-full bg-vibrant-green animate-pulse" />
            <span className="text-clean-white/70 text-sm">Joining as: </span>
            <span className="text-vibrant-green font-medium">{userDisplayName}</span>
          </div>

          {/* Join Button */}
          <div className="space-y-4">
            <motion.a
              href={jitsiUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-vibrant-green to-electric-blue text-space-dark font-bold text-lg shadow-lg shadow-vibrant-green/25 hover:shadow-vibrant-green/40 transition-shadow"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Join Video Room
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>

            <p className="text-clean-white/40 text-sm">
              Opens in a new tab • No time limits • Free
            </p>
          </div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 grid grid-cols-3 gap-4"
          >
            {[
              { icon: '🎥', label: 'HD Video' },
              { icon: '🔒', label: 'Secure' },
              { icon: '💬', label: 'Live Chat' },
            ].map((feature) => (
              <div 
                key={feature.label}
                className="p-4 rounded-xl bg-clean-white/5 border border-clean-white/10"
              >
                <span className="text-2xl mb-2 block">{feature.icon}</span>
                <span className="text-clean-white/60 text-sm">{feature.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
