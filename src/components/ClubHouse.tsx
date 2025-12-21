import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const activeProjects = [
  {
    title: 'Daily Web3 Research',
    description: 'Exploring new protocols and opportunities in the decentralized space.',
    status: 'Active',
    icon: '🔍',
  },
  {
    title: 'Community Building',
    description: 'Growing a community of like-minded Web3 enthusiasts.',
    status: 'Active',
    icon: '👥',
  },
  {
    title: 'Educational Content',
    description: 'Creating guides and tutorials for Web3 beginners.',
    status: 'In Progress',
    icon: '📚',
  },
];

export default function ClubHouse() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="clubhouse" className="relative py-24 bg-space-dark overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-40 right-20 w-80 h-80 bg-electric-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-vibrant-green/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-electric-blue text-sm font-medium tracking-widest uppercase mb-4 block">
            Content Hub
          </span>
          <h2 
            className="text-4xl md:text-6xl font-bold text-clean-white"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            Club <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-vibrant-green">House</span>
          </h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
            {/* Active Projects */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h3 className="text-lg font-bold text-clean-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-electric-blue/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </span>
                Active Projects
              </h3>
              <div className="space-y-3">
                {activeProjects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="p-4 rounded-2xl bg-clean-white/5 border border-clean-white/10 hover:border-vibrant-green/30 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{project.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-clean-white text-sm group-hover:text-vibrant-green transition-colors">{project.title}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            project.status === 'Active' 
                              ? 'bg-vibrant-green/20 text-vibrant-green' 
                              : 'bg-electric-blue/20 text-electric-blue'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        <p className="text-xs text-clean-white/50">{project.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
