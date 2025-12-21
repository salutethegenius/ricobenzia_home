import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useNFTGate } from '../hooks/useNFTGate';

export default function GatedVault() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { isConnected } = useAccount();
  const { hasAccess, isLoading } = useNFTGate();

  return (
    <section id="vault" className="relative py-24 bg-space-dark overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-80 h-80 bg-cosmic-purple/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-vibrant-green/10 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cosmic-purple/20 border border-cosmic-purple/30 mb-6">
            <svg className="w-4 h-4 text-cosmic-purple-light" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
            </svg>
            <span className="text-cosmic-purple-light text-sm font-medium">NFT-Gated Video Conference</span>
          </div>
          
          <h2 
            className="text-4xl md:text-6xl font-bold text-clean-white mb-4"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cosmic-purple-light to-vibrant-green">Vault</span>
          </h2>
          <p className="text-clean-white/50 max-w-xl mx-auto">
            Exclusive video conference room for NFT holders. Connect your wallet and verify ownership to join the meeting.
          </p>
        </motion.div>

        {/* Access Status Card / Jitsi Room */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {!isConnected ? (
            <div className="p-8 rounded-3xl bg-gradient-to-br from-cosmic-purple/20 to-cosmic-purple/5 border border-cosmic-purple/20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-cosmic-purple/30 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-cosmic-purple-light" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-clean-white mb-2">Connect Your Wallet</h3>
              <p className="text-clean-white/50 mb-6 max-w-md mx-auto">
                Connect your wallet to check if you have access to the exclusive video conference room.
              </p>
              <p className="text-sm text-clean-white/30">
                Scroll up and click "Connect Wallet" to get started.
              </p>
            </div>
          ) : isLoading ? (
            <div className="p-8 rounded-3xl bg-clean-white/5 border border-clean-white/10 text-center">
              <div className="w-12 h-12 border-4 border-vibrant-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-clean-white/60">Checking NFT ownership...</p>
            </div>
          ) : hasAccess ? (
            <div className="p-8 rounded-3xl bg-gradient-to-br from-vibrant-green/20 to-vibrant-green/5 border border-vibrant-green/30 text-center">
              <div className="w-20 h-20 rounded-2xl bg-vibrant-green/30 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-vibrant-green" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-vibrant-green mb-3">Access Granted!</h3>
              <p className="text-clean-white/60 mb-8 max-w-md mx-auto">
                Your NFT has been verified. You can now join the exclusive video conference room with other holders.
              </p>
              <Link to="/vault/room">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 rounded-full bg-gradient-to-r from-vibrant-green to-electric-blue text-space-dark font-bold text-lg shadow-lg shadow-vibrant-green/30"
                >
                  🎥 Join Video Room
                </motion.button>
              </Link>
              <p className="text-clean-white/40 text-sm mt-6">
                Opens in a dedicated full-screen experience
              </p>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-gradient-to-br from-cosmic-purple/20 to-cosmic-purple/5 border border-cosmic-purple/20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-cosmic-purple/30 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-cosmic-purple-light" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-clean-white mb-2">NFT Required</h3>
              <p className="text-clean-white/50 mb-6 max-w-md mx-auto">
                You need to hold our access NFT to join the exclusive video conference room.
              </p>
              <motion.a
                href="https://opensea.io/collection/ricobenzia-access"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-cosmic-purple to-vibrant-green text-space-dark font-bold"
              >
                Get Access NFT
              </motion.a>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
