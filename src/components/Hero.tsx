import { motion } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useCMS } from '../hooks/useCMS';

export default function Hero() {
  const { getSectionContent } = useCMS();
  const content = getSectionContent('hero');
  
  // Fallback to hardcoded content if CMS is not available or loading
  // Convert ContentValue to string for rendering
  const title = String(content.title || 'RICO BENZIA');
  const subtitle = String(content.subtitle || 'Where the tail ends is where the adventure begins');
  const description = String(content.description || 'Freedom Begins with Self Banking');

  return (
    <section id="home" className="relative min-h-screen cosmic-bg overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-vibrant-green/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{ top: '20%', left: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-electric-blue/10 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{ bottom: '10%', right: '10%' }}
        />
        <motion.div
          className="absolute w-48 h-48 rounded-full bg-cosmic-purple-light/20 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ top: '40%', right: '30%' }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(124, 252, 0, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124, 252, 0, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 1.5, bounce: 0.4 }}
          className="mb-8"
        >
          <img 
            src="/assets/bunny-final.png" 
            alt="Global Bunny" 
            className="w-48 h-48 md:w-64 md:h-64 object-contain animate-float drop-shadow-[0_0_30px_rgba(124,252,0,0.3)]"
          />
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          {title.includes('RICO') || title.includes('BENZIA') ? (
            <>
              <span className="text-vibrant-green">RICO</span>
              <span className="text-electric-blue">BENZIA</span>
            </>
          ) : (
            <span className="text-vibrant-green">{title}</span>
          )}
        </motion.h1>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-xl md:text-2xl text-clean-white/80 mb-8 max-w-2xl"
          dangerouslySetInnerHTML={{ __html: subtitle.replace(/adventure/g, '<span class="text-vibrant-green font-semibold">adventure</span>') }}
        />

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="glass rounded-2xl px-10 py-6 mb-10"
        >
          <p className="text-lg text-electric-blue font-medium tracking-wide">
            {description}
          </p>
        </motion.div>

        {/* Wallet Connect Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              mounted,
            }) => {
              const ready = mounted;
              const connected = ready && account && chain;

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    style: {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <motion.button
                          onClick={openConnectModal}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn-primary text-lg"
                        >
                          Connect Wallet
                        </motion.button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <motion.button
                          onClick={openChainModal}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn-primary bg-red-500"
                        >
                          Wrong Network
                        </motion.button>
                      );
                    }

                    return (
                      <div className="flex gap-3">
                        <motion.button
                          onClick={openChainModal}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn-secondary flex items-center gap-2"
                        >
                          {chain.hasIcon && chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              className="w-5 h-5"
                            />
                          )}
                          {chain.name}
                        </motion.button>

                        <motion.button
                          onClick={openAccountModal}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn-primary"
                        >
                          {account.displayName}
                        </motion.button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary"
          >
            Explore
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-clean-white/50"
          >
            <span className="text-sm">Scroll to explore</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
