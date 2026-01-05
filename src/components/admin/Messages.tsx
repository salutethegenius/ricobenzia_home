import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
}

export default function Messages() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setMessages(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const toggleReadStatus = async (messageId: string, currentStatus: boolean) => {
    try {
      const { error: updateError } = await supabase
        .from('messages')
        .update({ read: !currentStatus })
        .eq('id', messageId);

      if (updateError) throw updateError;
      
      // Update local state
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, read: !currentStatus } : msg
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update message');
    }
  };

  const deleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const { error: deleteError } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageId);

      if (deleteError) throw deleteError;
      
      // Update local state
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete message');
    }
  };

  const filteredMessages = messages.filter((msg) => {
    if (filter === 'unread') return !msg.read;
    if (filter === 'read') return msg.read;
    return true;
  });

  const unreadCount = messages.filter((msg) => !msg.read).length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
            <img 
              src="/assets/bunny-final.png" 
              alt="RicoBenzia" 
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold text-clean-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Contact <span className="text-vibrant-green">Messages</span>
              </h1>
              <p className="text-clean-white/50 text-sm">
                {messages.length} total message{messages.length !== 1 ? 's' : ''}
                {unreadCount > 0 && (
                  <span className="text-vibrant-green ml-2">
                    • {unreadCount} unread
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              onClick={fetchMessages}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-clean-white/5 border border-clean-white/10 text-clean-white hover:border-vibrant-green transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </motion.button>
            <motion.button
              onClick={() => navigate('/admin/dashboard')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-clean-white/5 border border-clean-white/10 text-clean-white hover:border-vibrant-green transition-colors"
            >
              Back to Dashboard
            </motion.button>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 mb-6"
        >
          {(['all', 'unread', 'read'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === filterType
                  ? 'bg-vibrant-green text-space-dark'
                  : 'bg-clean-white/5 text-clean-white/70 hover:bg-clean-white/10'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              {filterType === 'unread' && unreadCount > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-space-dark/50 text-xs">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 mb-6"
          >
            {error}
          </motion.div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-vibrant-green border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredMessages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">📭</div>
            <p className="text-clean-white/60 text-lg">
              No {filter !== 'all' ? filter : ''} messages found
            </p>
          </motion.div>
        ) : (
          /* Messages List */
          <div className="space-y-4">
            {filteredMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-6 rounded-2xl border transition-all ${
                  message.read
                    ? 'bg-clean-white/5 border-clean-white/10'
                    : 'bg-vibrant-green/5 border-vibrant-green/30'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-clean-white">
                        {message.name}
                      </h3>
                      {!message.read && (
                        <span className="px-2 py-1 rounded-full bg-vibrant-green/20 text-vibrant-green text-xs font-medium">
                          New
                        </span>
                      )}
                    </div>
                    <a
                      href={`mailto:${message.email}`}
                      className="text-electric-blue hover:text-electric-blue/80 text-sm"
                    >
                      {message.email}
                    </a>
                    <p className="text-clean-white/40 text-xs mt-1">
                      {formatDate(message.created_at)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => toggleReadStatus(message.id, message.read)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-2 rounded-lg transition-colors ${
                        message.read
                          ? 'bg-clean-white/5 hover:bg-vibrant-green/20 text-clean-white/50 hover:text-vibrant-green'
                          : 'bg-vibrant-green/20 hover:bg-vibrant-green/30 text-vibrant-green'
                      }`}
                      title={message.read ? 'Mark as unread' : 'Mark as read'}
                    >
                      {message.read ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                    </motion.button>
                    <motion.button
                      onClick={() => deleteMessage(message.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
                      title="Delete message"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
                <div className="mt-4 p-4 rounded-lg bg-space-dark/50 border border-clean-white/5">
                  <p className="text-clean-white/80 leading-relaxed whitespace-pre-wrap">
                    {message.message}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

