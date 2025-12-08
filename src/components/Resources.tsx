import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// Placeholder resources - to be replaced with actual content
const resources = [
  {
    id: 1,
    title: 'Getting Started with Web3',
    description: 'A beginner-friendly guide to entering the Web3 space safely.',
    category: 'Guide',
    icon: '📚',
    link: '#',
  },
  {
    id: 2,
    title: 'Wallet Security 101',
    description: 'Essential tips for keeping your digital assets safe.',
    category: 'Security',
    icon: '🔐',
    link: '#',
  },
  {
    id: 3,
    title: 'DeFi Fundamentals',
    description: 'Understanding decentralized finance and its opportunities.',
    category: 'Education',
    icon: '💰',
    link: '#',
  },
  {
    id: 4,
    title: 'NFT Essentials',
    description: 'Learn about NFTs and how to navigate the space.',
    category: 'Guide',
    icon: '🎨',
    link: '#',
  },
];

const categories = ['All', 'Guide', 'Security', 'Education'];

export default function Resources() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="resources" className="relative py-20 cosmic-bg overflow-hidden">
      {/* Decorative grid */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(124, 252, 0, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124, 252, 0, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold text-clean-white mb-4"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            <span className="text-vibrant-green">Resources</span>
          </h2>
          <p className="text-clean-white/60 max-w-2xl mx-auto">
            Curated resources to help you navigate the Web3 ecosystem safely and effectively.
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
          {categories.map((category, index) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                index === 0
                  ? 'bg-vibrant-green text-space-dark'
                  : 'glass text-clean-white hover:bg-vibrant-green/20'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {resources.map((resource, index) => (
            <motion.a
              key={resource.id}
              href={resource.link}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              className="glass rounded-2xl p-8 block group cursor-pointer card-hover"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{resource.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-3 py-1 rounded-full bg-vibrant-green/20 text-vibrant-green font-medium">
                      {resource.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-clean-white mb-2 group-hover:text-vibrant-green transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-clean-white/60 text-sm">
                    {resource.description}
                  </p>
                </div>
                <motion.div
                  className="text-vibrant-green opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ x: 5 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-clean-white/50 text-sm">
            More resources coming soon. Stay tuned!
          </p>
        </motion.div>
      </div>
    </section>
  );
}

