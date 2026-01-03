import { useState, useEffect, Component, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Resources from './components/Resources';
import ClubHouse from './components/ClubHouse';
import Gameroom from './components/Gameroom';
import Charts from './components/Charts';
import DeFi from './components/DeFi';
import GatedVault from './components/GatedVault';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './routes/Admin';
import VaultRoom from './routes/VaultRoom';
import PrivacyPolicy from './routes/PrivacyPolicy';
import TermsOfService from './routes/TermsOfService';

// Error Boundary Component
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-space-dark flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-2xl bg-red-500/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-clean-white mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Something went <span className="text-red-400">wrong</span>
            </h1>
            <p className="text-clean-white/60 mb-6">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-vibrant-green to-electric-blue text-space-dark font-bold"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Disclaimer Modal Component
function DisclaimerModal({ onAccept }: { onAccept: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-space-dark/95 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="max-w-lg w-full bg-gradient-to-br from-space-dark to-cosmic-purple rounded-2xl p-8 border border-vibrant-green/30 shadow-2xl"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src="/assets/bunny-final.png" 
            alt="RicoBenzia" 
            className="h-20 w-auto"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-clean-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Welcome to <span className="text-vibrant-green">RicoBenzia</span>
        </h2>
        <p className="text-electric-blue text-center text-sm mb-6">
          Where the tail ends is where the adventure begins
        </p>

        {/* Disclaimer Text */}
        <div className="bg-space-dark/50 rounded-xl p-4 mb-6 max-h-48 overflow-y-auto">
          <p className="text-clean-white/70 text-sm leading-relaxed">
            <span className="text-vibrant-green font-bold">Important Disclaimer:</span> The content on this website is provided for 
            <span className="text-electric-blue font-medium"> educational and entertainment purposes only</span>. 
            Nothing here constitutes financial, investment, legal, or tax advice.
          </p>
          <p className="text-clean-white/70 text-sm leading-relaxed mt-3">
            Cryptocurrency, DeFi, and blockchain technologies involve significant risks, including the potential 
            total loss of invested capital. Always conduct your own research (DYOR) and consult qualified 
            professionals before making any financial decisions.
          </p>
          <p className="text-clean-white/70 text-sm leading-relaxed mt-3">
            By entering this site, you acknowledge that you understand these risks and agree that RicoBenzia 
            is not responsible for any losses incurred from information or links provided here.
          </p>
        </div>

        {/* Accept Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAccept}
          className="w-full btn-primary text-lg py-4"
        >
          I Understand, Let's Go!
        </motion.button>

        <p className="text-center text-clean-white/30 text-xs mt-4">
          By clicking above, you agree to our terms and disclaimer.
        </p>
      </motion.div>
    </motion.div>
  );
}

// Loading Screen Component
function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-space-dark">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.img 
          src="/assets/bunny-final.png" 
          alt="Loading" 
          className="h-32 w-auto mx-auto mb-6"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="w-2 h-2 rounded-full bg-vibrant-green animate-pulse" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-vibrant-green animate-pulse" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-vibrant-green animate-pulse" style={{ animationDelay: '300ms' }} />
        </motion.div>
      </motion.div>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    // Check if user has already accepted disclaimer
    const hasAccepted = localStorage.getItem('ricobenzia_disclaimer_accepted');
    
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!hasAccepted) {
        setShowDisclaimer(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);


  const handleAcceptDisclaimer = () => {
    localStorage.setItem('ricobenzia_disclaimer_accepted', 'true');
    setShowDisclaimer(false);
  };

  return (
    <ErrorBoundary>
      <Routes>
        <Route
          path="/admin/*"
          element={<Admin />}
        />
        <Route
          path="/vault/room"
          element={<VaultRoom />}
        />
        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
        />
        <Route
          path="/terms-of-service"
          element={<TermsOfService />}
        />
        <Route
          path="/*"
          element={
            <>
              <AnimatePresence mode="wait">
                {isLoading && <LoadingScreen key="loading" />}
              </AnimatePresence>

              <AnimatePresence>
                {showDisclaimer && (
                  <DisclaimerModal key="disclaimer" onAccept={handleAcceptDisclaimer} />
                )}
              </AnimatePresence>

              {!isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Navbar />
                  <main>
                    <Hero />
                    <About />
                    <Resources />
                    <ClubHouse />
                    <Gameroom />
                    <Charts />
                    <DeFi />
                    <GatedVault />
                    <Contact />
                  </main>
                  <Footer />
                </motion.div>
              )}
            </>
          }
        />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
