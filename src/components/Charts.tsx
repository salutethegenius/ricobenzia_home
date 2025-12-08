import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

const chartSymbols = [
  { symbol: 'BTCUSD', name: 'Bitcoin' },
  { symbol: 'ETHUSD', name: 'Ethereum' },
];

const dataResources = [
  {
    name: 'CryptoQuant',
    description: 'On-chain data and market analytics',
    url: 'https://cryptoquant.com',
    icon: '📊',
  },
  {
    name: 'Binance',
    description: 'Leading cryptocurrency exchange',
    url: 'https://www.binance.com',
    icon: '💹',
  },
  {
    name: 'TradingView',
    description: 'Charts and technical analysis',
    url: 'https://www.tradingview.com',
    icon: '📈',
  },
  {
    name: 'CoinDesk',
    description: 'Crypto news and market updates',
    url: 'https://www.coindesk.com',
    icon: '📰',
  },
];

// TradingView Widget Component
function TradingViewWidget({ symbol }: { symbol: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear any existing content
    containerRef.current.innerHTML = '';
    
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: `BINANCE:${symbol}`,
      width: '100%',
      height: '100%',
      locale: 'en',
      dateRange: '12M',
      colorTheme: 'dark',
      isTransparent: true,
      autosize: true,
      largeChartUrl: '',
    });
    
    containerRef.current.appendChild(script);
  }, [symbol]);

  return (
    <div 
      ref={containerRef} 
      className="h-[300px] rounded-xl overflow-hidden"
    />
  );
}

export default function Charts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="charts" className="relative py-20 bg-clean-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-vibrant-green via-electric-blue to-cosmic-purple" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-cosmic-purple/5 blur-3xl" />

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold text-cosmic-purple mb-4"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            Charts & <span className="text-vibrant-green">Analytics</span>
          </h2>
          <p className="text-space-dark/60 max-w-2xl mx-auto">
            Live market data and analytical resources we use daily.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-vibrant-green to-electric-blue mx-auto rounded-full mt-6" />
        </motion.div>

        {/* TradingView Charts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-cosmic-purple mb-6">Live Charts</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {chartSymbols.map((chart, index) => (
              <motion.div
                key={chart.symbol}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-space-dark rounded-2xl p-4 overflow-hidden"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-vibrant-green animate-pulse" />
                  <span className="text-vibrant-green font-medium">{chart.name}</span>
                </div>
                <TradingViewWidget symbol={chart.symbol} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Data Resources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-cosmic-purple mb-6">Data Resources</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dataResources.map((resource, index) => (
              <motion.a
                key={resource.name}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-xl bg-gradient-to-br from-space-dark/5 to-cosmic-purple/10 border border-cosmic-purple/10 hover:border-vibrant-green/50 transition-all group"
              >
                <span className="text-3xl mb-3 block">{resource.icon}</span>
                <h4 className="font-bold text-cosmic-purple group-hover:text-vibrant-green transition-colors mb-1">
                  {resource.name}
                </h4>
                <p className="text-sm text-space-dark/60">{resource.description}</p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

