import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useAccount } from 'wagmi';
import { useNFTGate } from '../hooks/useNFTGate';

const premiumContent = [
  {
    id: 1,
    title: 'Advanced DeFi Strategies',
    description: 'Deep dive into yield optimization techniques.',
    duration: '45 min',
    thumbnail: null,
  },
  {
    id: 2,
    title: 'NFT Trading Masterclass',
    description: 'Learn to identify valuable NFT opportunities.',
    duration: '60 min',
    thumbnail: null,
  },
  {
    id: 3,
    title: 'Web3 Security Essentials',
    description: 'Protect your assets from common threats.',
    duration: '30 min',
    thumbnail: null,
  },
  {
    id: 4,
    title: 'GameFi Economics',
    description: 'Understanding play-to-earn tokenomics.',
    duration: '40 min',
    thumbnail: null,
  },
];

export default function GatedVault() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { isConnected } = useAccount();
  const { hasAccess, isLoading } = useNFTGate();

  return (
    <section id="vault" className="relative py-20 bg-clean-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cosmic-purple via-electric-blue to-vibrant-green" />
      <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-cosmic-purple/5 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-vibrant-green/5 blur-3xl" />

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cosmic-purple/10 text-cosmic-purple mb-4">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
            </svg>
            <span className="font-medium text-sm">NFT-Gated Content</span>
          </div>
          
          <h2 
            className="text-4xl md:text-5xl font-bold text-cosmic-purple mb-4"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            The <span className="text-vibrant-green">Vault</span>
          </h2>
          <p className="text-space-dark/60 max-w-2xl mx-auto">
            Exclusive content for NFT holders. Connect your wallet and verify ownership to access.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-vibrant-green to-electric-blue mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {premiumContent.map((content, index) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Card */}
              <div className={`rounded-2xl overflow-hidden border-2 transition-all ${
                hasAccess 
                  ? 'border-vibrant-green/30 hover:border-vibrant-green' 
                  : 'border-space-dark/10'
              }`}>
                {/* Thumbnail Area */}
                <div className="aspect-video bg-gradient-to-br from-space-dark to-cosmic-purple relative">
                  {/* Lock Overlay */}
                  {!hasAccess && (
                    <div className="absolute inset-0 flex items-center justify-center bg-space-dark/80 backdrop-blur-sm">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="text-center lock-shake cursor-pointer"
                      >
                        <svg className="w-16 h-16 text-vibrant-green mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                        </svg>
                        <p className="text-clean-white/80 font-medium">NFT Required</p>
                      </motion.div>
                    </div>
                  )}

                  {/* Play Button (visible when unlocked) */}
                  {hasAccess && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 rounded-full bg-vibrant-green flex items-center justify-center cursor-pointer"
                      >
                        <svg className="w-8 h-8 text-space-dark ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </motion.div>
                    </div>
                  )}

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-space-dark/80 text-clean-white text-xs font-medium">
                    {content.duration}
                  </div>
                </div>

                {/* Content Info */}
                <div className="p-6 bg-clean-white">
                  <h3 className="text-lg font-bold text-cosmic-purple mb-2">
                    {content.title}
                  </h3>
                  <p className="text-space-dark/60 text-sm">
                    {content.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Access Status */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12"
        >
          {!isConnected ? (
            <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-cosmic-purple/10 to-electric-blue/10 border border-cosmic-purple/20">
              <svg className="w-12 h-12 text-cosmic-purple mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>
              <h3 className="text-xl font-bold text-cosmic-purple mb-2">Connect Your Wallet</h3>
              <p className="text-space-dark/60 mb-4">
                Connect your wallet to check if you have access to exclusive content.
              </p>
              <p className="text-sm text-space-dark/40">
                Scroll up and click "Connect Wallet" to get started.
              </p>
            </div>
          ) : isLoading ? (
            <div className="text-center p-8 rounded-2xl bg-space-dark/5">
              <div className="w-12 h-12 border-4 border-vibrant-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-space-dark/60">Checking NFT ownership...</p>
            </div>
          ) : hasAccess ? (
            <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-vibrant-green/10 to-electric-blue/10 border border-vibrant-green/30">
              <svg className="w-12 h-12 text-vibrant-green mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              <h3 className="text-xl font-bold text-vibrant-green-dark mb-2">Access Granted!</h3>
              <p className="text-space-dark/60">
                Your NFT has been verified. Enjoy the exclusive content!
              </p>
            </div>
          ) : (
            <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-cosmic-purple/10 to-space-dark/10 border border-cosmic-purple/20">
              <svg className="w-12 h-12 text-cosmic-purple mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
              <h3 className="text-xl font-bold text-cosmic-purple mb-2">NFT Required</h3>
              <p className="text-space-dark/60 mb-4">
                You need to hold our access NFT to view this content.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Get Access NFT
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
