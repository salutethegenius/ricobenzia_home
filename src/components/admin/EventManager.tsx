import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  loadEvents, 
  saveEvents, 
  generateEventId, 
  formatEventDate,
  type Event 
} from '../../data/events';

export default function EventManager() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<Omit<Event, 'id'>>({
    title: '',
    date: '',
    time: '',
    description: '',
    link: '',
    image: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const loadedEvents = await loadEvents();
      setEvents(loadedEvents);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      description: '',
      link: '',
      image: '',
    });
    setEditingEvent(null);
    setShowForm(false);
    setError(null);
    setSuccess(null);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      description: event.description,
      link: event.link || '',
      image: event.image || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const updatedEvents = events.filter(e => e.id !== eventId);
      const result = await saveEvents(updatedEvents);
      
      if (result.error) {
        setError(result.error);
      } else {
        setEvents(updatedEvents);
        setSuccess('Event deleted successfully!');
        setTimeout(() => setSuccess(null), 3000);
        // Trigger event update for other components
        window.dispatchEvent(new CustomEvent('eventsUpdated', { detail: updatedEvents }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete event');
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!formData.date.trim()) {
      setError('Date is required');
      return;
    }
    if (!formData.time.trim()) {
      setError('Time is required');
      return;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(formData.date)) {
      setError('Date must be in YYYY-MM-DD format');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      let updatedEvents: Event[];
      
      if (editingEvent) {
        // Update existing event
        updatedEvents = events.map(e => 
          e.id === editingEvent.id 
            ? { 
                ...formData, 
                id: editingEvent.id,
                link: formData.link?.trim() || undefined,
                image: formData.image?.trim() || undefined,
              } as Event
            : e
        );
      } else {
        // Create new event
        const newEvent: Event = {
          ...formData,
          id: generateEventId(),
          link: formData.link?.trim() || undefined,
          image: formData.image?.trim() || undefined,
        };
        updatedEvents = [...events, newEvent];
      }

      const result = await saveEvents(updatedEvents);
      
      if (result.error) {
        setError(result.error);
      } else {
        setEvents(updatedEvents);
        setSuccess(editingEvent ? 'Event updated successfully!' : 'Event created successfully!');
        resetForm();
        setTimeout(() => setSuccess(null), 3000);
        // Trigger event update for other components
        window.dispatchEvent(new CustomEvent('eventsUpdated', { detail: updatedEvents }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save event');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-space-dark p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="p-2 rounded-lg bg-clean-white/5 border border-clean-white/10 text-clean-white hover:border-vibrant-green transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-clean-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Event <span className="text-vibrant-green">Manager</span>
              </h1>
              <p className="text-clean-white/50 text-sm">Manage calendar events</p>
            </div>
          </div>
          <motion.button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-electric-blue to-vibrant-green text-space-dark font-bold hover:opacity-90 transition-opacity"
          >
            + New Event
          </motion.button>
        </motion.div>

        {/* Success/Error Messages */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-4 rounded-lg bg-vibrant-green/20 border border-vibrant-green/50 text-vibrant-green"
            >
              {success}
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Event Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-space-dark/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
              onClick={resetForm}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-cosmic-purple to-space-dark rounded-xl md:rounded-2xl p-4 md:p-8 max-w-2xl w-full border border-vibrant-green/50 shadow-2xl max-h-[90vh] overflow-y-auto my-4 md:my-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-clean-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {editingEvent ? 'Edit Event' : 'Create New Event'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-clean-white/70 hover:text-clean-white text-2xl md:text-3xl transition-colors touch-manipulation"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-clean-white/80 mb-2 font-semibold">
                      Title <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 md:py-3 rounded-lg bg-clean-white/5 border border-clean-white/10 text-clean-white focus:border-vibrant-green focus:outline-none transition-colors text-base"
                      placeholder="Community AMA"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-clean-white/80 mb-2 font-semibold text-sm md:text-base">
                        Date <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-clean-white/5 border border-clean-white/10 text-clean-white focus:border-vibrant-green focus:outline-none transition-colors text-base"
                      />
                      <p className="text-clean-white/50 text-xs mt-1">Format: YYYY-MM-DD</p>
                    </div>
                    <div>
                      <label className="block text-clean-white/80 mb-2 font-semibold text-sm md:text-base">
                        Time <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-clean-white/5 border border-clean-white/10 text-clean-white focus:border-vibrant-green focus:outline-none transition-colors text-base"
                        placeholder="2:00 PM EST"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-clean-white/80 mb-2 font-semibold">
                      Description <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-clean-white/5 border border-clean-white/10 text-clean-white focus:border-vibrant-green focus:outline-none transition-colors resize-none text-base"
                      placeholder="Event description..."
                    />
                  </div>

                  <div>
                    <label className="block text-clean-white/80 mb-2 font-semibold">
                      Link (Optional)
                    </label>
                    <input
                      type="url"
                      name="link"
                      value={formData.link}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-clean-white/5 border border-clean-white/10 text-clean-white focus:border-vibrant-green focus:outline-none transition-colors"
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label className="block text-clean-white/80 mb-2 font-semibold">
                      Image URL (Optional)
                    </label>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-clean-white/5 border border-clean-white/10 text-clean-white focus:border-vibrant-green focus:outline-none transition-colors"
                      placeholder="/assets/filename.jpg or https://..."
                    />
                    <p className="text-clean-white/50 text-xs mt-1">
                      Use local path like <code className="text-electric-blue">/assets/fishing-da-market.jpg</code> or external URL
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
                    <motion.button
                      type="submit"
                      disabled={saving}
                      whileHover={{ scale: saving ? 1 : 1.02 }}
                      whileTap={{ scale: saving ? 1 : 0.98 }}
                      className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-electric-blue to-vibrant-green text-space-dark font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation text-base"
                    >
                      {saving ? 'Saving...' : editingEvent ? 'Update Event' : 'Create Event'}
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={resetForm}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 rounded-lg bg-clean-white/5 border border-clean-white/10 text-clean-white hover:border-clean-white/30 transition-colors touch-manipulation text-base"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Events List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-vibrant-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-clean-white/70">Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="inline-block p-6 bg-cosmic-purple/50 rounded-xl border border-electric-blue/20 mb-4">
              <span className="text-4xl">📅</span>
            </div>
            <p className="text-clean-white/70 text-lg mb-4">No events yet</p>
            <motion.button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-electric-blue to-vibrant-green text-space-dark font-bold"
            >
              Create Your First Event
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-clean-white/5 to-clean-white/[0.02] rounded-xl p-6 border border-clean-white/10 hover:border-vibrant-green/30 transition-all"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-clean-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    {event.title}
                  </h3>
                  <div className="space-y-1 text-sm text-clean-white/70">
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
                
                <p className="text-clean-white/80 text-sm mb-4 line-clamp-3">
                  {event.description}
                </p>

                {event.link && (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-vibrant-green hover:text-electric-blue text-sm font-semibold mb-4 inline-block"
                  >
                    View Link →
                  </a>
                )}

                <div className="flex gap-2 pt-4 border-t border-clean-white/10">
                  <motion.button
                    onClick={() => handleEdit(event)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-2 rounded-lg bg-electric-blue/20 border border-electric-blue/30 text-electric-blue hover:border-electric-blue transition-colors text-sm font-semibold"
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(event.id)}
                    disabled={saving}
                    whileHover={{ scale: saving ? 1 : 1.05 }}
                    whileTap={{ scale: saving ? 1 : 0.95 }}
                    className="flex-1 px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 hover:border-red-500 transition-colors text-sm font-semibold disabled:opacity-50"
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
