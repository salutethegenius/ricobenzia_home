import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Save message to Supabase
      const { error: submitError } = await supabase
        .from('messages')
        .insert({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        });
      
      if (submitError) throw submitError;
      
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error('Error submitting message:', err);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 cosmic-bg overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-vibrant-green/5 blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ bottom: '10%', left: '10%' }}
        />
      </div>

      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold text-clean-white mb-4"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            Get in <span className="text-vibrant-green">Touch</span>
          </h2>
          <p className="text-clean-white/60 max-w-2xl mx-auto">
            Have questions or want to collaborate? Drop us a message.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-vibrant-green to-electric-blue mx-auto rounded-full mt-6" />
        </motion.div>

        <div className="max-w-xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-xl p-6 space-y-5">
              <div>
                <label className="block text-clean-white/70 text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-space-dark/50 border border-vibrant-green/20 text-clean-white placeholder-clean-white/30 focus:outline-none focus:border-vibrant-green transition-colors"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-clean-white/70 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-space-dark/50 border border-vibrant-green/20 text-clean-white placeholder-clean-white/30 focus:outline-none focus:border-vibrant-green transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-clean-white/70 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-space-dark/50 border border-vibrant-green/20 text-clean-white placeholder-clean-white/30 focus:outline-none focus:border-vibrant-green transition-colors resize-none"
                  placeholder="What's on your mind?"
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-space-dark border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </motion.button>

              {/* Success Message */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-vibrant-green/20 text-vibrant-green text-center"
                >
                  Message sent successfully! We'll get back to you soon.
                </motion.div>
              )}
              
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-red-500/20 text-red-400 text-center"
                >
                  {error}
                </motion.div>
              )}
            </form>
            
            {/* Response Time */}
            <p className="text-clean-white/40 text-sm text-center mt-4">
              We typically respond within 24-48 hours.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

