import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const socialLinks = [
  {
    name: 'YouTube',
    description: 'Video content & tutorials',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    url: '#',
    color: 'hover:border-red-500/50 hover:bg-red-500/10',
    iconColor: 'group-hover:text-red-500',
  },
  {
    name: 'Twitter / X',
    description: 'Updates & thoughts',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    url: '#',
    color: 'hover:border-clean-white/50 hover:bg-clean-white/10',
    iconColor: 'group-hover:text-clean-white',
  },
  {
    name: 'Discord',
    description: 'Join the community',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
    url: '#',
    color: 'hover:border-indigo-500/50 hover:bg-indigo-500/10',
    iconColor: 'group-hover:text-indigo-400',
  },
  {
    name: 'Telegram',
    description: 'Direct updates',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
    url: '#',
    color: 'hover:border-sky-500/50 hover:bg-sky-500/10',
    iconColor: 'group-hover:text-sky-400',
  },
];

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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* YouTube Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="p-8 rounded-3xl bg-gradient-to-br from-clean-white/5 to-clean-white/[0.02] border border-clean-white/10 hover:border-red-500/30 transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-clean-white">Latest Content</h3>
              </div>
              
              {/* YouTube Embed Placeholder */}
              <div className="aspect-video bg-space-dark rounded-2xl overflow-hidden relative group border border-clean-white/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-4 cursor-pointer shadow-lg shadow-red-500/30"
                    >
                      <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </motion.div>
                    <p className="text-clean-white/60">YouTube Channel Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-lg font-bold text-clean-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-vibrant-green/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-vibrant-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </span>
                Connect With Us
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`group flex items-center gap-3 p-4 rounded-2xl bg-clean-white/5 border border-clean-white/10 transition-all duration-300 ${social.color}`}
                  >
                    <span className={`text-clean-white/40 transition-colors ${social.iconColor}`}>
                      {social.icon}
                    </span>
                    <div>
                      <span className="font-medium text-clean-white block text-sm">{social.name}</span>
                      <span className="text-clean-white/40 text-xs">{social.description}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

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
      </div>
    </section>
  );
}
