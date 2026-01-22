import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const games = [
  {
    name: 'Raven Quest',
    description: 'Epic fantasy MMORPG with play-to-earn mechanics.',
    url: 'https://ravenquest.io/register/ref/77080',
    category: 'RPG',
    color: 'from-purple-600 to-indigo-600',
    logo: '/assets/logos/games/ravenquest.webp',
  },
  {
    name: 'Raven Idle',
    description: 'Idle game companion to the Raven Quest universe.',
    url: 'https://game.ravenidle.com/en/auth/register?referralCode=12992ac7-5a61-4cb6-bbd0-4d77f62c3099',
    category: 'Idle',
    color: 'from-indigo-600 to-blue-600',
    logo: '/assets/logos/games/ravenidle.png',
  },
  {
    name: 'Gods Unchained',
    description: 'Free-to-play tactical card game with true ownership.',
    url: 'https://godsunchained.com',
    category: 'Card Game',
    color: 'from-amber-600 to-orange-600',
    logo: '/assets/logos/games/godsunchained.png',
  },
  {
    name: 'Pixels',
    description: 'Open-world farming game on the blockchain.',
    url: 'https://play.pixels.xyz',
    category: 'Farming',
    color: 'from-green-600 to-emerald-600',
    logo: '/assets/logos/games/pixels.png',
  },
  {
    name: 'Mobox',
    description: 'Gaming platform combining DeFi yield farming and NFTs.',
    url: 'https://www.mobox.io/#/cmcairdrop?source=14027073',
    category: 'Platform',
    color: 'from-blue-600 to-cyan-600',
    logo: '/assets/logos/games/mobox.png',
  },
  {
    name: 'IMX Games',
    description: 'Immutable X gaming ecosystem with zero gas fees.',
    url: 'https://play.immutable.com/referral/share/rmDgCl?utm_source=referral',
    category: 'Ecosystem',
    color: 'from-cyan-600 to-teal-600',
    logo: '/assets/logos/games/imx.jpg',
  },
  {
    name: 'Pixel Dungeons',
    description: 'Dungeon crawler with blockchain-based rewards.',
    url: 'https://pixeldungeons.xyz/?ref=3wxh461o8dwa3dsf',
    category: 'Adventure',
    color: 'from-rose-600 to-pink-600',
    logo: '/assets/logos/games/pixeldungeons.png',
  },
  {
    name: 'Ape Reunion',
    description: 'Community-built web3 metaverse game with NFT collections.',
    url: 'https://www.apereunion.xyz/',
    category: 'Metaverse',
    color: 'from-violet-600 to-fuchsia-600',
    logo: '/assets/ruionape.webp',
  },
];

export default function Gameroom() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="gameroom" className="relative py-20 cosmic-bg overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-vibrant-green/5 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          style={{ top: '10%', left: '5%' }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-electric-blue/5 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          style={{ bottom: '20%', right: '10%' }}
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
          <h2 
            className="text-4xl md:text-5xl font-bold text-clean-white mb-4 text-center"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            Game<span className="text-vibrant-green">room</span>
          </h2>
          <p 
            className="text-clean-white/60 max-w-2xl"
            style={{ textAlign: 'center', margin: '0 auto' }}
          >
            Web3 games we play, test, and recommend. Click to join with our referral links.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-vibrant-green to-electric-blue mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <motion.a
              key={game.name}
              href={game.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              {/* Card Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
              
              {/* Glass overlay */}
              <div className="absolute inset-0 bg-space-dark/40 group-hover:bg-space-dark/20 transition-colors" />
              
              {/* Content */}
              <div className="relative p-6 min-h-[180px] flex flex-col justify-between">
                <div>
                  {/* Logo */}
                  {game.logo && (
                    <div className="mb-3 flex justify-center">
                      <img 
                        src={game.logo} 
                        alt={`${game.name} logo`}
                        className="h-10 w-auto object-contain max-w-full"
                        onError={(e) => {
                          // Hide image if it fails to load
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <span className="text-xs px-3 py-1 rounded-full bg-clean-white/20 text-clean-white font-medium">
                    {game.category}
                  </span>
                  <h3 className="text-2xl font-bold text-clean-white mt-4 mb-2 group-hover:text-vibrant-green transition-colors">
                    {game.name}
                  </h3>
                  <p className="text-clean-white/70 text-sm">
                    {game.description}
                  </p>
                </div>
                
                {/* Play Button */}
                <div className="flex items-center gap-2 mt-4 text-vibrant-green font-medium">
                  <span>Play Now</span>
                  <motion.svg 
                    className="w-5 h-5"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-vibrant-green/20 to-transparent" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center text-clean-white/40 text-sm mt-12"
        >
          * Referral links may provide rewards to both parties. Always DYOR before participating.
        </motion.p>
      </div>
    </section>
  );
}

