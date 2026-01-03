import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

type Category = 'all' | 'cex' | 'dex' | 'yield';

interface Project {
  name: string;
  description: string;
  url: string;
  category: 'cex' | 'dex' | 'yield';
  status?: string;
}

const centralizedExchanges: Project[] = [
  {
    name: 'Binance',
    description: 'World\'s largest crypto exchange by volume.',
    url: 'https://accounts.binance.com/register?ref=RICOBENZ',
    category: 'cex',
  },
  {
    name: 'Blofin',
    description: 'Advanced trading platform for crypto derivatives.',
    url: '#',
    category: 'cex',
  },
  {
    name: 'Crypto.com',
    description: 'All-in-one crypto platform with card services.',
    url: '#',
    category: 'cex',
  },
  {
    name: 'RedotPay',
    description: 'Crypto payment solutions for everyday use.',
    url: '#',
    category: 'cex',
  },
];

const decentralizedExchanges: Project[] = [
  {
    name: 'Uniswap',
    description: 'Leading DEX on Ethereum with deep liquidity.',
    url: 'https://app.uniswap.org',
    category: 'dex',
  },
  {
    name: 'StellarX (XLM)',
    description: 'User-friendly interface for the Stellar DEX.',
    url: 'https://www.stellarx.com',
    category: 'dex',
  },
  {
    name: 'Sologenic (XRPL)',
    description: 'Trade tokenized assets on the XRP Ledger.',
    url: 'https://sologenic.org/',
    category: 'dex',
  },
  {
    name: 'Cosmos',
    description: 'A universe of blockchains in one wallet.',
    url: 'https://cosmos.network/',
    category: 'dex',
  },
];

const yieldFarming: Project[] = [
  {
    name: 'Aquarius',
    description: 'Liquidity management for Stellar network.',
    url: 'https://aqua.network/',
    category: 'yield',
  },
  {
    name: 'Pixels Staking',
    description: 'Stake your PIXEL tokens for rewards.',
    url: 'https://staking.pixels.xyz/',
    category: 'yield',
  },
  {
    name: 'C.R.E.A.M. Finance',
    description: 'DeFi lending and borrowing protocol.',
    url: 'https://cream.finance/',
    category: 'yield',
  },
  {
    name: 'Abracadabra.money',
    description: 'Spell token ecosystem for leverage.',
    url: 'https://abracadabra.money/',
    category: 'yield',
    status: 'Vetting',
  },
];

const allProjects = [...centralizedExchanges, ...decentralizedExchanges, ...yieldFarming];

const categories = [
  { id: 'all' as Category, label: 'All Projects', count: allProjects.length },
  { id: 'cex' as Category, label: 'Exchanges (CEX)', count: centralizedExchanges.length },
  { id: 'dex' as Category, label: 'DEX', count: decentralizedExchanges.length },
  { id: 'yield' as Category, label: 'Yield Farming', count: yieldFarming.length },
];

export default function DeFi() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredProjects = activeCategory === 'all' 
    ? allProjects 
    : allProjects.filter(p => p.category === activeCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cex': return 'bg-electric-blue/20 text-electric-blue';
      case 'dex': return 'bg-vibrant-green/20 text-vibrant-green-dark';
      case 'yield': return 'bg-cosmic-purple/20 text-cosmic-purple';
      default: return 'bg-space-dark/20 text-space-dark';
    }
  };

  return (
    <section id="defi" className="relative py-20 cosmic-bg overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-electric-blue/5 blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          style={{ top: '20%', right: '10%' }}
        />
      </div>

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold text-clean-white mb-4 text-center"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            <span className="text-vibrant-green">DeFi</span> Projects
          </h2>
          <p className="text-clean-white/60 max-w-2xl mx-auto text-center">
            Decentralized finance platforms and exchanges we use and recommend.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-vibrant-green to-electric-blue mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-vibrant-green text-space-dark'
                  : 'glass text-clean-white hover:bg-vibrant-green/20'
              }`}
            >
              {cat.label}
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                activeCategory === cat.id 
                  ? 'bg-space-dark/20' 
                  : 'bg-clean-white/10'
              }`}>
                {cat.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {filteredProjects.map((project, index) => (
            <motion.a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="glass rounded-xl p-6 group cursor-pointer relative overflow-hidden"
            >
              {/* Status Badge */}
              {project.status && (
                <div className="absolute top-3 right-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 font-medium">
                    {project.status}
                  </span>
                </div>
              )}
              
              {/* Category Badge */}
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(project.category)}`}>
                {project.category.toUpperCase()}
              </span>
              
              <h3 className="text-lg font-bold text-clean-white mt-4 mb-2 group-hover:text-vibrant-green transition-colors">
                {project.name}
              </h3>
              
              <p className="text-clean-white/50 text-sm mb-4">
                {project.description}
              </p>
              
              {/* Arrow */}
              <div className="flex items-center gap-1 text-vibrant-green text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Visit</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 bg-vibrant-green/0 group-hover:bg-vibrant-green/5 transition-colors rounded-xl pointer-events-none" />
            </motion.a>
          ))}
        </motion.div>

        {/* DYOR Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12 p-6 glass rounded-xl"
        >
          <p className="text-clean-white/60 text-sm">
            <span className="text-vibrant-green font-bold">DYOR:</span> Always do your own research before investing. 
            These are tools and platforms we use, not financial advice.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

