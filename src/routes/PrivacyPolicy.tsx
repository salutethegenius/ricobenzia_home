import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCMS } from '../hooks/useCMS';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const privacySections = [
  { 
    key: 'introduction', 
    title: '1. Introduction',
    defaultContent: 'Welcome to RicoBenzia. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website.'
  },
  { 
    key: 'information_collect', 
    title: '2. Information We Collect',
    defaultContent: 'We may collect information that you voluntarily provide when you register for an account, subscribe to our newsletter, contact us through our contact form, or participate in our community features. We also automatically collect certain information when you visit our website, including IP address, browser type, device information, pages visited, and referring website addresses.'
  },
  { 
    key: 'how_use', 
    title: '3. How We Use Your Information',
    defaultContent: 'We use the information we collect to provide, maintain, and improve our services; respond to your inquiries and provide customer support; send you newsletters and updates (with your consent); analyze website usage and trends; detect and prevent fraud or abuse; and comply with legal obligations.'
  },
  { 
    key: 'cookies', 
    title: '4. Cookies and Tracking Technologies',
    defaultContent: 'We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files stored on your device that help us remember your preferences and improve site functionality. You can control cookie settings through your browser preferences.'
  },
  { 
    key: 'third_party', 
    title: '5. Third-Party Services',
    defaultContent: 'Our website may contain links to third-party websites or integrate with third-party services (such as analytics providers, social media platforms, or blockchain networks). We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies.'
  },
  { 
    key: 'data_security', 
    title: '6. Data Security',
    defaultContent: 'We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.'
  },
  { 
    key: 'your_rights', 
    title: '7. Your Rights',
    defaultContent: 'Depending on your location, you may have the following rights regarding your personal data: access to your personal data, correction of inaccurate data, deletion of your data, objection to processing, data portability, and withdrawal of consent. To exercise these rights, please contact us using the information provided in the Contact section.'
  },
  { 
    key: 'children_privacy', 
    title: "8. Children's Privacy",
    defaultContent: 'Our website is not intended for children under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.'
  },
  { 
    key: 'changes_policy', 
    title: '9. Changes to This Policy',
    defaultContent: 'We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our website after such changes constitutes acceptance of the updated policy.'
  },
  { 
    key: 'contact', 
    title: '10. Contact Us',
    defaultContent: 'If you have any questions about this privacy policy or our data practices, please contact us through our contact form or visit our About section.'
  },
];

export default function PrivacyPolicy() {
  const { getSectionContent, loading } = useCMS();
  const content = getSectionContent('privacy');

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
              Privacy <span className="text-vibrant-green">Policy</span>
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
                {privacySections.map((section) => {
                  const sectionContent = content[section.key] || section.defaultContent;
                  return (
                    <section key={section.key}>
                      <h2 className="text-2xl font-bold text-vibrant-green mb-4">{section.title}</h2>
                      <p className="text-clean-white/70 leading-relaxed whitespace-pre-line">
                        {String(sectionContent)}
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
