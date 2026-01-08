import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadEvents, getUpcomingEvents, formatEventDate, type Event } from '../data/events';

export default function EventCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        await loadEvents();
        setUpcomingEvents(getUpcomingEvents());
      } catch (error) {
        console.error('Failed to load events:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();

    // Listen for events updates
    const handleEventsUpdate = () => {
      fetchEvents();
    };
    window.addEventListener('eventsUpdated', handleEventsUpdate);
    
    return () => {
      window.removeEventListener('eventsUpdated', handleEventsUpdate);
    };
  }, []);

  return (
    <section id="events" className="py-20 bg-gradient-to-b from-space-dark via-cosmic-purple/30 to-space-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric-blue/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-vibrant-green/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-electric-blue to-vibrant-green bg-clip-text text-transparent"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            Event Calendar
          </h2>
          <p className="text-clean-white/70 text-lg max-w-2xl mx-auto">
            Join us for upcoming events, AMAs, workshops, and community gatherings
          </p>
        </motion.div>

        {/* Events Grid */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="inline-block p-6 bg-cosmic-purple/50 rounded-xl border border-electric-blue/20 mb-4">
              <div className="w-12 h-12 border-4 border-vibrant-green border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
            <p className="text-clean-white/70 text-lg">Loading events...</p>
          </motion.div>
        ) : upcomingEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-cosmic-purple/80 to-space-dark/80 rounded-xl p-6 
                           border border-electric-blue/20 hover:border-vibrant-green/50 
                           transition-all duration-300 cursor-pointer backdrop-blur-sm
                           hover:shadow-lg hover:shadow-vibrant-green/20"
                onClick={() => setSelectedEvent(event)}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-clean-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {event.title}
                    </h3>
                    <div className="space-y-2 text-sm text-clean-white/70">
                      <p className="flex items-center gap-2">
                        <span className="text-electric-blue">📅</span>
                        {formatEventDate(event.date)}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-vibrant-green">🕐</span>
                        {event.time}
                      </p>
                    </div>
                  </div>
                </div>
                
                <p className="text-clean-white/80 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>

                {event.link && (
                  <motion.a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 text-vibrant-green hover:text-electric-blue 
                             transition-colors text-sm font-semibold group"
                    whileHover={{ x: 5 }}
                  >
                    Join Event
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </motion.a>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="inline-block p-6 bg-cosmic-purple/50 rounded-xl border border-electric-blue/20 mb-4">
              <span className="text-4xl">📅</span>
            </div>
            <p className="text-clean-white/70 text-lg">
              No upcoming events scheduled. Check back soon!
            </p>
          </motion.div>
        )}

        {/* Event Details Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-space-dark/95 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-cosmic-purple to-space-dark rounded-2xl p-8 
                         max-w-2xl w-full border border-vibrant-green/50 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="float-right text-clean-white/70 hover:text-clean-white text-3xl mb-4 transition-colors"
                >
                  ×
                </button>
                
                <h3 
                  className="text-3xl font-bold text-clean-white mb-4" 
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {selectedEvent.title}
                </h3>
                
                <div className="space-y-4 mb-6 text-clean-white/80">
                  <p className="flex items-center gap-3 text-lg">
                    <span className="text-electric-blue text-2xl">📅</span>
                    <span>{formatEventDate(selectedEvent.date)}</span>
                  </p>
                  <p className="flex items-center gap-3 text-lg">
                    <span className="text-vibrant-green text-2xl">🕐</span>
                    <span>{selectedEvent.time}</span>
                  </p>
                  <div className="pt-4 border-t border-electric-blue/20">
                    <p className="text-clean-white/90 leading-relaxed">{selectedEvent.description}</p>
                  </div>
                </div>

                {selectedEvent.link && (
                  <motion.a
                    href={selectedEvent.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-electric-blue to-vibrant-green 
                             text-space-dark px-8 py-4 rounded-full font-bold hover:opacity-90 
                             transition-opacity shadow-lg shadow-vibrant-green/30"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Join Event Now →
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
