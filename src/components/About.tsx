import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-24 bg-space-dark overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(124, 252, 0, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-vibrant-green/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-electric-blue/10 rounded-full blur-3xl" />

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-vibrant-green text-sm font-medium tracking-widest uppercase mb-4 block">
            Who We Are
          </span>
          <h2 
            className="text-4xl md:text-6xl font-bold text-clean-white"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-vibrant-green to-electric-blue">Us</span>
          </h2>
        </motion.div>

        {/* Main Content - Bento Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Vision Card - Large */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 group"
          >
            <div className="h-full p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-clean-white/5 to-clean-white/[0.02] border border-clean-white/10 hover:border-vibrant-green/30 transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-vibrant-green/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-vibrant-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-clean-white">A Digital World of Possibilities</h3>
              </div>
              <p className="text-clean-white/60 text-lg leading-relaxed mb-6">
                A Digital world where we always strive to have a positively productive day. 
                We research, test and use web3 products daily.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Games', 'DeFi', 'CeFi', 'AI', 'NFTs'].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full bg-vibrant-green/10 text-vibrant-green text-sm font-medium border border-vibrant-green/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group"
          >
            <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-vibrant-green/20 to-vibrant-green/5 border border-vibrant-green/20 hover:border-vibrant-green/40 transition-all duration-500 flex flex-col justify-center">
              <div className="w-14 h-14 rounded-2xl bg-vibrant-green/30 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-vibrant-green" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-vibrant-green/60 text-sm font-medium uppercase tracking-wider mb-2">Our Mission</span>
              <h3 className="text-2xl lg:text-3xl font-bold text-clean-white leading-tight">
                Freedom Begins with Self Banking
              </h3>
            </div>
          </motion.div>

          {/* Story Card - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-clean-white/5 to-clean-white/[0.02] border border-clean-white/10 hover:border-electric-blue/30 transition-all duration-500">
              <div className="grid lg:grid-cols-[auto,1fr] gap-8 items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-electric-blue/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-clean-white">The Story</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-clean-white/60 leading-relaxed">
                    After spending many years in the digital assets space, I realized that many ordinary everyday 
                    people like myself have interest in it as well, but do not know of a safe avenue to get started.
                  </p>
                  <p className="text-clean-white/60 leading-relaxed">
                    On the other hand, I find that those who have already entered the field have a very hard time 
                    finding like-minded individuals to bounce ideas off of, or really even have a real conversation 
                    about blockchain and web3 in general.
                  </p>
                  <p className="text-clean-white/80 leading-relaxed font-medium">
                    So I decided to share some of the things that I do daily, to those that find value in it, 
                    and now here we are.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Founder Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <div className="text-center mb-10">
            <span className="text-electric-blue text-sm font-medium tracking-widest uppercase">The Founder</span>
          </div>
          
          <div className="flex justify-center">
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-vibrant-green via-electric-blue to-vibrant-green rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              
              {/* Card */}
              <div className="relative p-8 lg:p-10 rounded-3xl bg-space-dark border border-clean-white/10 flex flex-col md:flex-row items-center gap-8 max-w-2xl">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-vibrant-green/50 p-1 bg-gradient-to-br from-vibrant-green/20 to-electric-blue/20">
                    <img 
                      src="/assets/bunny-final.png" 
                      alt="RicoBenz" 
                      className="w-full h-full object-contain rounded-xl bg-space-dark"
                    />
                  </div>
                  {/* Online indicator */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-vibrant-green rounded-full border-4 border-space-dark" />
                </div>
                
                {/* Info */}
                <div className="text-center md:text-left">
                  <h4 className="text-2xl font-bold text-vibrant-green mb-1">RicoBenz</h4>
                  <p className="text-electric-blue font-medium mb-4">Founder & Web3 Explorer</p>
                  <p className="text-clean-white/50 text-sm leading-relaxed max-w-sm">
                    Navigating the digital frontier one block at a time. Building bridges between Web3 and everyday people.
                  </p>
                  
                  {/* Social Links */}
                  <div className="flex justify-center md:justify-start gap-3 mt-5">
                    <a href="#" className="w-10 h-10 rounded-xl bg-clean-white/5 hover:bg-vibrant-green/20 flex items-center justify-center text-clean-white/40 hover:text-vibrant-green transition-all">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-xl bg-clean-white/5 hover:bg-vibrant-green/20 flex items-center justify-center text-clean-white/40 hover:text-vibrant-green transition-all">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-xl bg-clean-white/5 hover:bg-vibrant-green/20 flex items-center justify-center text-clean-white/40 hover:text-vibrant-green transition-all">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
