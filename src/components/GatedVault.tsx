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
    icon: '💎',
  },
  {
    id: 2,
    title: 'NFT Trading Masterclass',
    description: 'Learn to identify valuable NFT opportunities.',
    duration: '60 min',
    icon: '🎨',
  },
  {
    id: 3,
    title: 'Web3 Security Essentials',
    description: 'Protect your assets from common threats.',
    duration: '30 min',
    icon: '🛡️',
  },
  {
    id: 4,
    title: 'GameFi Economics',
    description: 'Understanding play-to-earn tokenomics.',
    duration: '40 min',
    icon: '🎮',
  },
];

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
            <span className="text-cosmic-purple-light text-sm font-medium">NFT-Gated Content</span>
          </div>
          
          <h2 
            className="text-4xl md:text-6xl font-bold text-clean-white mb-4"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cosmic-purple-light to-vibrant-green">Vault</span>
          </h2>
          <p className="text-clean-white/50 max-w-xl mx-auto">
            Exclusive content for NFT holders. Connect your wallet and verify ownership to access premium materials.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {premiumContent.map((content, index) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className={`p-6 rounded-3xl bg-gradient-to-br from-clean-white/5 to-clean-white/[0.02] border transition-all duration-500 ${
                hasAccess 
                  ? 'border-vibrant-green/30 hover:border-vibrant-green' 
                  : 'border-clean-white/10 hover:border-cosmic-purple/30'
              }`}>
                <div className="flex items-start gap-4">
                  {/* Icon / Lock */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
                    hasAccess 
                      ? 'bg-vibrant-green/20' 
                      : 'bg-cosmic-purple/20'
                  }`}>
                    {hasAccess ? content.icon : (
                      <svg className="w-6 h-6 text-cosmic-purple-light" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                      </svg>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-bold transition-colors ${
                        hasAccess 
                          ? 'text-clean-white group-hover:text-vibrant-green' 
                          : 'text-clean-white/70'
                      }`}>
                        {content.title}
                      </h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-clean-white/10 text-clean-white/50">
                        {content.duration}
                      </span>
                    </div>
                    <p className="text-sm text-clean-white/50">
                      {content.description}
                    </p>
                    
                    {/* Action Button */}
                    {hasAccess ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-4 flex items-center gap-2 text-vibrant-green text-sm font-medium"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                        Watch Now
                      </motion.button>
                    ) : (
                      <div className="mt-4 flex items-center gap-2 text-cosmic-purple-light text-sm">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                        </svg>
                        NFT Required
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Access Status Card */}
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
                Connect your wallet to check if you have access to exclusive content.
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
              <div className="w-16 h-16 rounded-2xl bg-vibrant-green/30 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-vibrant-green" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-vibrant-green mb-2">Access Granted!</h3>
              <p className="text-clean-white/60">
                Your NFT has been verified. Enjoy the exclusive content!
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
                You need to hold our access NFT to view this exclusive content.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-cosmic-purple to-vibrant-green text-space-dark font-bold"
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
