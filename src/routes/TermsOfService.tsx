import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCMS } from '../hooks/useCMS';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const termsSections = [
  { 
    key: 'acceptance', 
    title: '1. Acceptance of Terms',
    defaultContent: 'By accessing and using RicoBenzia, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of such modifications.'
  },
  { 
    key: 'educational_purpose', 
    title: '2. Educational and Entertainment Purpose',
    defaultContent: 'Important: All content on RicoBenzia is provided for educational and entertainment purposes only. Nothing on this website constitutes financial, investment, legal, or tax advice. You should always conduct your own research (DYOR) and consult with qualified professionals before making any financial decisions.'
  },
  { 
    key: 'risk_disclaimer', 
    title: '3. Risk Disclaimer',
    defaultContent: 'Cryptocurrency, blockchain technology, DeFi, NFTs, and related activities involve significant risks, including: the potential for total loss of invested capital, high volatility and market fluctuations, regulatory uncertainty and changes, technical risks including smart contract vulnerabilities, scams, fraud, and phishing attacks, and loss of private keys or wallet access. By using this website, you acknowledge that you understand these risks and agree that RicoBenzia is not responsible for any losses incurred from following any information, links, or recommendations provided on this site.'
  },
  { 
    key: 'user_conduct', 
    title: '4. User Conduct',
    defaultContent: 'You agree to use RicoBenzia only for lawful purposes and in accordance with these Terms. You agree not to: violate any applicable laws or regulations, infringe upon the rights of others, transmit any harmful, offensive, or illegal content, attempt to gain unauthorized access to our systems, interfere with or disrupt the website\'s functionality, use automated systems to scrape or harvest data, or impersonate any person or entity.'
  },
  { 
    key: 'intellectual_property', 
    title: '5. Intellectual Property',
    defaultContent: 'All content on RicoBenzia, including text, graphics, logos, images, and software, is the property of RicoBenzia or its content suppliers and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from our content without express written permission.'
  },
  { 
    key: 'third_party_links', 
    title: '6. Third-Party Links and Services',
    defaultContent: 'Our website may contain links to third-party websites, services, or blockchain networks. We do not endorse or assume responsibility for the content, privacy policies, or practices of these third parties. Your interactions with third-party services are solely between you and the third party.'
  },
  { 
    key: 'no_investment_advice', 
    title: '7. No Investment Advice',
    defaultContent: 'RicoBenzia does not provide investment, financial, or trading advice. Any information about cryptocurrencies, tokens, DeFi protocols, or other digital assets is for informational purposes only. Past performance is not indicative of future results. Always do your own research and consult with qualified financial advisors before making investment decisions.'
  },
  { 
    key: 'limitation_liability', 
    title: '8. Limitation of Liability',
    defaultContent: 'To the fullest extent permitted by law, RicoBenzia and its operators shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use our website, including but not limited to losses from cryptocurrency trading, DeFi activities, or reliance on information provided on the site.'
  },
  { 
    key: 'indemnification', 
    title: '9. Indemnification',
    defaultContent: 'You agree to indemnify, defend, and hold harmless RicoBenzia and its operators from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the website, violation of these Terms, or infringement of any rights of another party.'
  },
  { 
    key: 'termination', 
    title: '10. Termination',
    defaultContent: 'We reserve the right to terminate or suspend your access to RicoBenzia at any time, without prior notice, for any reason, including if you violate these Terms of Service. Upon termination, your right to use the website will immediately cease.'
  },
  { 
    key: 'governing_law', 
    title: '11. Governing Law',
    defaultContent: 'These Terms of Service shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. Any disputes arising from these terms or your use of the website shall be resolved through appropriate legal channels.'
  },
  { 
    key: 'changes_terms', 
    title: '12. Changes to Terms',
    defaultContent: 'We reserve the right to modify these Terms of Service at any time. We will notify users of material changes by updating the "Last updated" date. Your continued use of RicoBenzia after such changes constitutes acceptance of the modified terms.'
  },
  { 
    key: 'contact_info', 
    title: '13. Contact Information',
    defaultContent: 'If you have any questions about these Terms of Service, please contact us through our contact form or visit our About section.'
  },
];

export default function TermsOfService() {
  const { getSectionContent, loading } = useCMS();
  const content = getSectionContent('terms');

  return (
    <div className="min-h-screen bg-space-dark">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 
              className="text-4xl md:text-5xl font-bold text-clean-white mb-4"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              Terms of <span className="text-vibrant-green">Service</span>
            </h1>
            <p className="text-clean-white/60 text-sm">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>

          {/* Content */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-vibrant-green border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-invert max-w-none"
            >
              <div className="bg-gradient-to-br from-clean-white/5 to-clean-white/[0.02] border border-clean-white/10 rounded-2xl p-8 space-y-8">
                {termsSections.map((section) => {
                  const sectionContent = content[section.key] || section.defaultContent;
                  return (
                    <section key={section.key}>
                      <h2 className="text-2xl font-bold text-vibrant-green mb-4">{section.title}</h2>
                      <p className="text-clean-white/70 leading-relaxed whitespace-pre-line">
                        {sectionContent}
                      </p>
                    </section>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-vibrant-green hover:text-electric-blue transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Home</span>
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
