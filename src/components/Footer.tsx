import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-space-dark py-12 border-t border-vibrant-green/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <motion.div 
              className="flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <img 
                src="/assets/bunny-final.png" 
                alt="RicoBenzia" 
                className="h-12 w-auto"
              />
              <span className="text-vibrant-green font-bold text-xl tracking-wider">
                RICOBENZIA
              </span>
            </motion.div>
            <p className="text-clean-white/50 text-sm">
              Where the tail ends is where the adventure begins.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-vibrant-green font-bold mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
              {['About', 'Resources', 'Club House', 'Gameroom', 'Charts', 'DeFi'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(' ', '')}`}
                  className="text-clean-white/50 hover:text-vibrant-green transition-colors text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-vibrant-green font-bold mb-4">Legal</h4>
            <div className="space-y-2">
              <a href="#" className="block text-clean-white/50 hover:text-vibrant-green transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="block text-clean-white/50 hover:text-vibrant-green transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-vibrant-green/10 pt-8 mb-8">
          <div className="bg-cosmic-purple/20 rounded-xl p-6 border border-cosmic-purple/30 max-w-4xl mx-auto">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-electric-blue flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              <div>
                <h5 className="text-electric-blue font-bold mb-2">Educational Disclaimer</h5>
                <p className="text-clean-white/60 text-sm leading-relaxed">
                  The content provided on this website is for <span className="text-vibrant-green font-medium">educational and entertainment purposes only</span>. 
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
        <div className="text-center">
          <p className="text-clean-white/40 text-sm">
            &copy; {currentYear} RicoBenzia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

