import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

interface VaultHelperVideoProps {
  videoSrc: string;
  title?: string;
  description?: string;
}

export default function VaultHelperVideo({ 
  videoSrc, 
  title = "How to Access The Vault",
  description = "Watch this quick guide to learn how to connect your wallet and access the exclusive NFT-gated video conference room."
}: VaultHelperVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
      className="mt-12"
    >
      <div className="p-8 rounded-3xl bg-gradient-to-br from-cosmic-purple/20 to-electric-blue/10 border border-cosmic-purple/20 backdrop-blur-sm">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-blue/20 border border-electric-blue/30 mb-4">
            <svg className="w-5 h-5 text-electric-blue" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span className="text-electric-blue text-sm font-medium">Helper Video</span>
          </div>
          <h3 
            className="text-2xl md:text-3xl font-bold text-clean-white mb-3"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            {title}
          </h3>
          <p className="text-clean-white/60 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Video Container */}
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-space-dark border-2 border-cosmic-purple/30 shadow-2xl">
            {/* Video Element */}
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-full object-cover"
              controls
              preload="metadata"
              onLoadedData={handleLoadedData}
              style={{
                outline: 'none',
              }}
            />

            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-space-dark/80">
                <div className="w-16 h-16 border-4 border-electric-blue border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-electric-blue/20 via-vibrant-green/20 to-cosmic-purple/20 rounded-2xl blur-xl opacity-50 -z-10" />
        </div>
      </div>
    </motion.div>
  );
}
