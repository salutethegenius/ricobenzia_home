import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-20 bg-clean-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-vibrant-green via-electric-blue to-cosmic-purple" />
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-vibrant-green/5 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-electric-blue/5 blur-3xl" />

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold text-cosmic-purple mb-4"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            About <span className="text-vibrant-green">Us</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-vibrant-green to-electric-blue mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main About */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass bg-space-dark/5 rounded-2xl p-10 border border-vibrant-green/20">
              <h3 className="text-2xl font-bold text-cosmic-purple mb-4">
                A Digital World of Possibilities
              </h3>
              <p className="text-space-dark/80 leading-relaxed text-lg">
                A Digital world where we always strive to have a positively productive day. 
                We research, test and use web3 products daily. Games, DeFi, CeFi, AI... 
                if you name it and it's web3, we will find it, if it's there.
              </p>
            </div>

            {/* Mission Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-r from-cosmic-purple to-cosmic-purple-light rounded-2xl p-10 text-clean-white"
            >
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-8 h-8 text-vibrant-green" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <h4 className="text-xl font-bold">Our Mission</h4>
              </div>
              <p className="text-clean-white/90 text-lg font-medium">
                Freedom Begins with Self Banking
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-gradient-to-br from-space-dark to-cosmic-purple rounded-2xl p-10 text-clean-white relative overflow-hidden">
              {/* Background Pattern */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(124, 252, 0, 0.5) 1px, transparent 0)`,
                  backgroundSize: '20px 20px',
                }}
              />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-vibrant-green">The</span> Story
                </h3>
                <p className="text-clean-white/85 leading-relaxed mb-6">
                  After spending many years in the digital assets space, I realized that many 
                  ordinary everyday people like myself have interest in it as well, but do not 
                  know of a safe avenue to get started.
                </p>
                <p className="text-clean-white/85 leading-relaxed mb-6">
                  On the other hand, I find that those who have already entered the field have 
                  a very hard time finding like-minded individuals to bounce ideas off of, or 
                  really even have a real conversation about blockchain and web3 in general.
                </p>
                <p className="text-clean-white/85 leading-relaxed">
                  So I decided to share some of the things that I do daily, to those that find 
                  value in it, and now here we are.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-center text-cosmic-purple mb-10">
            Meet the <span className="text-vibrant-green">Team</span>
          </h3>
          
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-space-dark to-cosmic-purple rounded-2xl p-8 max-w-md text-center relative overflow-hidden group"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-vibrant-green/0 group-hover:bg-vibrant-green/5 transition-colors duration-500" />
              
              <div className="relative z-10">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-vibrant-green p-1">
                  <img 
                    src="/assets/bunny-final.png" 
                    alt="RicoBenz" 
                    className="w-full h-full object-contain rounded-full bg-space-dark"
                  />
                </div>
                <h4 className="text-2xl font-bold text-vibrant-green mb-2">RicoBenz</h4>
                <p className="text-electric-blue mb-4">Founder & Web3 Explorer</p>
                <p className="text-clean-white/70 text-sm">
                  Navigating the digital frontier one block at a time. 
                  Building bridges between Web3 and everyday people.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

