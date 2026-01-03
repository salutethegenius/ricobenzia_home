import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const sections = [
  { id: 'hero', name: 'Hero', icon: '🏠', description: 'Landing section with logo and main message' },
  { id: 'about', name: 'About', icon: '📖', description: 'Mission, story, and founder info' },
  { id: 'resources', name: 'Resources', icon: '📚', description: 'Educational materials and guides' },
  { id: 'clubhouse', name: 'Club House', icon: '🏛️', description: 'Social links and active projects' },
  { id: 'gameroom', name: 'Gameroom', icon: '🎮', description: 'Web3 games with referral links' },
  { id: 'charts', name: 'Charts', icon: '📊', description: 'Live BTC/ETH charts and data' },
  { id: 'defi', name: 'DeFi', icon: '💎', description: 'CEX, DEX, and yield farming projects' },
  { id: 'contact', name: 'Contact', icon: '📧', description: 'Contact form and social links' },
  { id: 'privacy', name: 'Privacy Policy', icon: '🔒', description: 'Privacy policy content and sections' },
  { id: 'terms', name: 'Terms of Service', icon: '📜', description: 'Terms of service content and sections' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-space-dark p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <img 
              src="/assets/bunny-final.png" 
              alt="RicoBenzia" 
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold text-clean-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                CMS <span className="text-vibrant-green">Dashboard</span>
              </h1>
              <p className="text-clean-white/50 text-sm">
                {user?.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-clean-white/5 border border-clean-white/10 text-clean-white hover:border-vibrant-green transition-colors"
            >
              View Site
            </motion.a>
            <motion.button
              onClick={handleSignOut}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-cosmic-purple/20 border border-cosmic-purple/30 text-clean-white hover:border-cosmic-purple transition-colors"
            >
              Sign Out
            </motion.button>
          </div>
        </motion.div>

        {/* Sections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate(`/admin/edit/${section.id}`)}
              className="p-6 rounded-2xl bg-gradient-to-br from-clean-white/5 to-clean-white/[0.02] border border-clean-white/10 hover:border-vibrant-green/30 cursor-pointer transition-all"
            >
              <div className="text-4xl mb-4">{section.icon}</div>
              <h3 className="text-xl font-bold text-clean-white mb-2">{section.name}</h3>
              <p className="text-clean-white/50 text-sm">{section.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
