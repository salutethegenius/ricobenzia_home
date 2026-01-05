import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();


  return (
    <footer className="bg-slate-900 border-t border-green-500/10 w-full">
      <div className="p-1" style={{ padding: '5px' }}>
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-6 lg:gap-8 mb-8 text-center md:text-left items-start">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <motion.div 
              className="flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <img 
                src="/assets/bunny-final.png" 
                alt="RicoBenzia" 
                className="h-20 w-20 object-contain"
              />
              <span className="text-green-500 font-bold text-xl tracking-wider">
                RICOBENZIA
              </span>
            </motion.div>
            <p className="text-white/50 text-sm">
              Where the tail ends is where the adventure begins.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-green-500 font-bold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {['About', 'Club House', 'Gameroom', 'Charts', 'DeFi', 'Vault'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/ /g, '')}`}
                  className="block text-white/50 hover:text-green-500 transition-colors text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-green-500 font-bold mb-4">Resources</h4>
            <div className="space-y-2">
              <a href="#resources" className="block text-white/50 hover:text-green-500 transition-colors text-sm">
                Learning Guides
              </a>
              <a href="#resources" className="block text-white/50 hover:text-green-500 transition-colors text-sm">
                Security Tips
              </a>
              <a href="#resources" className="block text-white/50 hover:text-green-500 transition-colors text-sm">
                DeFi Education
              </a>
              <a href="#resources" className="block text-white/50 hover:text-green-500 transition-colors text-sm">
                NFT Basics
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-green-500 font-bold mb-4">Legal</h4>
            <div className="space-y-2">
              <Link to="/privacy-policy" className="block text-white/50 hover:text-green-500 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="block text-white/50 hover:text-green-500 transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-green-500/10 pt-8 mb-8">
          <div className="bg-purple-900/20 rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              <div>
                <h5 className="text-blue-400 font-bold mb-2">Educational Disclaimer</h5>
                <p className="text-white/60 text-sm leading-relaxed">
                  The content provided on this website is for <span className="text-green-500 font-medium">educational and entertainment purposes only</span>. 
                  Nothing on this site constitutes financial, investment, legal, or tax advice. 
                  Cryptocurrency and DeFi involve significant risks, including the potential loss of all invested capital. 
                  Always conduct your own research (DYOR) and consult with qualified professionals before making any financial decisions. 
                  Past performance is not indicative of future results. We are not responsible for any losses incurred from following any information or links on this site.
                </p>
              </div>
            </div>
          </div>
        </div>

          {/* Bottom Bar */}
          <div className="text-center md:text-left">
            <p className="text-white/40 text-sm">
              &copy; {currentYear} RicoBenzia. All rights reserved. Made with ❤️ // <a href="https://kemisdigital.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">KemisDigital</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
