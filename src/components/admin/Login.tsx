import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = await signIn(email, password);
    
    if (result.error) {
      setError(result.error);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-space-dark flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-gradient-to-br from-space-dark to-cosmic-purple rounded-2xl p-8 border border-vibrant-green/30 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img 
              src="/assets/bunny-final.png" 
              alt="RicoBenzia" 
              className="h-16 w-auto"
            />
          </div>

          <h2 className="text-2xl font-bold text-center text-clean-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Admin <span className="text-vibrant-green">Login</span>
          </h2>
          <p className="text-electric-blue text-center text-sm mb-6">
            Access the CMS portal
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-clean-white/70 text-sm mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-clean-white/5 border border-clean-white/10 text-clean-white placeholder-clean-white/30 focus:outline-none focus:border-vibrant-green transition-colors"
                placeholder="admin@ricobenzia.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-clean-white/70 text-sm mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-clean-white/5 border border-clean-white/10 text-clean-white placeholder-clean-white/30 focus:outline-none focus:border-vibrant-green transition-colors"
                placeholder="••••••••"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
