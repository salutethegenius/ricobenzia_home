import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

const chartSymbols = [
  { symbol: 'BTCUSD', name: 'Bitcoin', color: '#F7931A' },
  { symbol: 'ETHUSD', name: 'Ethereum', color: '#627EEA' },
  { symbol: 'XRPUSD', name: 'XRP', color: '#0085C3' },
];

const dataResources = [
  {
    name: 'CryptoQuant',
    description: 'On-chain data and market analytics',
    url: 'https://cryptoquant.com',
    icon: '📊',
    color: 'from-orange-500/20 to-orange-500/5',
    borderColor: 'hover:border-orange-500/50',
  },
  {
    name: 'Binance',
    description: 'Leading cryptocurrency exchange',
    url: 'https://www.binance.com',
    icon: '💹',
    color: 'from-yellow-500/20 to-yellow-500/5',
    borderColor: 'hover:border-yellow-500/50',
  },
  {
    name: 'TradingView',
    description: 'Charts and technical analysis',
    url: 'https://www.tradingview.com',
    icon: '📈',
    color: 'from-blue-500/20 to-blue-500/5',
    borderColor: 'hover:border-blue-500/50',
  },
  {
    name: 'CoinDesk',
    description: 'Crypto news and market updates',
    url: 'https://www.coindesk.com',
    icon: '📰',
    color: 'from-purple-500/20 to-purple-500/5',
    borderColor: 'hover:border-purple-500/50',
  },
  
];

// TradingView Widget Component
function TradingViewWidget({ symbol }: { symbol: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Clear any existing content
    container.innerHTML = '';
    
    // Create container div for the widget
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'tradingview-widget-container';
    widgetContainer.style.height = '100%';
    widgetContainer.style.width = '100%';
    
    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.height = '100%';
    widgetDiv.style.width = '100%';
    widgetContainer.appendChild(widgetDiv);
    
    // Append container first, then add script
    container.appendChild(widgetContainer);
    
    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbol: `BINANCE:${symbol}`,
        width: '100%',
        height: '100%',
        locale: 'en',
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1', // 1 = Candlesticks
        hide_top_toolbar: true,
        hide_legend: false,
        allow_symbol_change: false,
        save_image: false,
        calendar: false,
        hide_volume: true,
        support_host: 'https://www.tradingview.com',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        gridColor: 'rgba(124, 252, 0, 0.06)',
      });
      
      if (widgetContainer.parentNode) {
        widgetContainer.appendChild(script);
      }
    }, 100);
    
    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [symbol]);

  return (
    <div 
      ref={containerRef} 
      className="h-[350px] rounded-xl overflow-hidden"
    />
  );
}

export default function Charts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="charts" className="relative py-24 bg-space-dark overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-electric-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-vibrant-green/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(124, 252, 0, 0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(124, 252, 0, 0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-vibrant-green text-sm font-medium tracking-widest uppercase mb-4 block">
            Market Data
          </span>
          <h2 
            className="text-4xl md:text-6xl font-bold text-clean-white"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            Charts & <span className="text-transparent bg-clip-text bg-gradient-to-r from-vibrant-green to-electric-blue">Analytics</span>
          </h2>
        </motion.div>

        {/* TradingView Charts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-vibrant-green/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-vibrant-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-clean-white">Live Charts</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {chartSymbols.map((chart, index) => (
              <motion.div
                key={chart.symbol}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="p-6 rounded-3xl bg-gradient-to-br from-clean-white/5 to-clean-white/[0.02] border border-clean-white/10 hover:border-vibrant-green/30 transition-all duration-500"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{ backgroundColor: chart.color }}
                  />
                  <span className="text-clean-white font-medium">{chart.name}</span>
                  <span className="text-clean-white/40 text-sm">({chart.symbol})</span>
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
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-electric-blue/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-clean-white">Data Resources</h3>
          </div>
          
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
                whileHover={{ scale: 1.03, y: -5 }}
                className={`group p-6 rounded-2xl bg-gradient-to-br ${resource.color} border border-clean-white/10 ${resource.borderColor} transition-all duration-300`}
              >
                <span className="text-4xl mb-4 block">{resource.icon}</span>
                <h4 className="font-bold text-clean-white group-hover:text-vibrant-green transition-colors mb-2">
                  {resource.name}
                </h4>
                <p className="text-sm text-clean-white/50">{resource.description}</p>
                <div className="mt-4 flex items-center gap-1 text-vibrant-green text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Visit</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
