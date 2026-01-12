import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadEvents, getUpcomingEvents, formatEventDate, clearEventsCache, type Event } from '../data/events';

export default function EventCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError(null);
      try {
        // Clear cache and force refresh to get latest data from backend
        clearEventsCache();
        const loadedEvents = await loadEvents(true);
        // Filter events from the current year
        const currentYearEvents = getUpcomingEvents(loadedEvents);
        setUpcomingEvents(currentYearEvents);
      } catch (error) {
        console.error('Failed to load events:', error);
        setError('Failed to load events. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchEvents();

    // Listen for events updates (works when admin portal is on same page)
    const handleEventsUpdate = () => {
      // Clear cache and reload events when updates occur
      fetchEvents();
    };
    window.addEventListener('eventsUpdated', handleEventsUpdate);
    
    // Refresh when page becomes visible (helps when navigating from admin portal)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchEvents();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('eventsUpdated', handleEventsUpdate);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <section id="events" className="py-12 md:py-20 bg-gradient-to-b from-space-dark via-cosmic-purple/30 to-space-dark relative overflow-hidden">
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
          className="text-center mb-12" style={{ textAlign: 'center' }}
        >
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-center bg-gradient-to-r from-electric-blue to-vibrant-green bg-clip-text text-transparent"
            style={{ fontFamily: 'Orbitron, sans-serif' , textAlign: 'center', width: '100%' }}
          >
            Event Calendar
          </h2>
          <p className="text-clean-white/70 text-base md:text-lg max-w-2xl mx-auto text-center px-4" style={{ textAlign: 'center', width: '100%' }}>
            Join us for upcoming events, AMAs, workshops, and community gatherings
          </p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 text-center"
          >
            {error}
          </motion.div>
        )}

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
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
                {/* Thumbnail/Image */}
                {event.image && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-40 md:h-48 object-cover"
                      loading="lazy"
                      onError={(e) => {
                        // Hide image if it fails to load
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-clean-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      {event.title}
                    </h3>
                    <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-clean-white/70">
                      <p className="flex items-center gap-2">
                        <span className="text-electric-blue">📅</span>
                        {formatEventDate(event.date)}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-vibrant-green">⏰</span>
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
              className="fixed inset-0 z-[100] bg-space-dark/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-cosmic-purple to-space-dark rounded-xl md:rounded-2xl p-4 md:p-8 
                         max-w-2xl w-full border border-vibrant-green/50 shadow-2xl my-4 md:my-8"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="float-right text-clean-white/70 hover:text-clean-white text-2xl md:text-3xl mb-2 md:mb-4 transition-colors touch-manipulation"
                  aria-label="Close"
                >
                  ×
                </button>
                
                {/* Thumbnail/Image in Modal */}
                {selectedEvent.image && (
                  <div className="mb-4 md:mb-6 rounded-lg overflow-hidden">
                    <img
                      src={selectedEvent.image}
                      alt={selectedEvent.title}
                      className="w-full h-48 md:h-64 object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                <h3 
                  className="text-2xl md:text-3xl font-bold text-clean-white mb-3 md:mb-4" 
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {selectedEvent.title}
                </h3>
                
                <div className="space-y-3 md:space-y-4 mb-4 md:mb-6 text-clean-white/80">
                  <p className="flex items-center gap-2 md:gap-3 text-base md:text-lg">
                    <span className="text-electric-blue text-xl md:text-2xl">📅</span>
                    <span className="break-words">{formatEventDate(selectedEvent.date)}</span>
                  </p>
                  <p className="flex items-center gap-2 md:gap-3 text-base md:text-lg">
                    <span className="text-vibrant-green text-xl md:text-2xl">⏰</span>
                    <span>{selectedEvent.time}</span>
                  </p>
                  <div className="pt-3 md:pt-4 border-t border-electric-blue/20">
                    <p className="text-clean-white/90 leading-relaxed text-sm md:text-base">{selectedEvent.description}</p>
                  </div>
                </div>

                {selectedEvent.link && (
                  <motion.a
                    href={selectedEvent.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-electric-blue to-vibrant-green 
                             text-space-dark px-6 md:px-8 py-3 md:py-4 rounded-full font-bold hover:opacity-90 
                             transition-opacity shadow-lg shadow-vibrant-green/30 w-full md:w-auto touch-manipulation"
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
