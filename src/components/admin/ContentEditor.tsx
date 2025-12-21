import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useCMS } from '../../hooks/useCMS';
import type { ContentUpdate } from '../../lib/supabase';

const sectionFields: Record<string, { field: string; label: string; type: 'text' | 'textarea' | 'json' }[]> = {
  hero: [
    { field: 'title', label: 'Title', type: 'text' },
    { field: 'subtitle', label: 'Subtitle', type: 'textarea' },
    { field: 'description', label: 'Description', type: 'textarea' },
  ],
  about: [
    { field: 'title', label: 'Title', type: 'text' },
    { field: 'content', label: 'Content', type: 'textarea' },
    { field: 'mission', label: 'Mission', type: 'textarea' },
  ],
  resources: [
    { field: 'title', label: 'Title', type: 'text' },
    { field: 'description', label: 'Description', type: 'textarea' },
    { field: 'items', label: 'Items (JSON)', type: 'json' },
  ],
  clubhouse: [
    { field: 'title', label: 'Title', type: 'text' },
    { field: 'description', label: 'Description', type: 'textarea' },
    { field: 'links', label: 'Links (JSON)', type: 'json' },
  ],
  gameroom: [
    { field: 'title', label: 'Title', type: 'text' },
    { field: 'description', label: 'Description', type: 'textarea' },
    { field: 'games', label: 'Games (JSON)', type: 'json' },
  ],
  charts: [
    { field: 'title', label: 'Title', type: 'text' },
    { field: 'description', label: 'Description', type: 'textarea' },
  ],
  defi: [
    { field: 'title', label: 'Title', type: 'text' },
    { field: 'description', label: 'Description', type: 'textarea' },
    { field: 'projects', label: 'Projects (JSON)', type: 'json' },
  ],
  contact: [
    { field: 'title', label: 'Title', type: 'text' },
    { field: 'description', label: 'Description', type: 'textarea' },
    { field: 'email', label: 'Email', type: 'text' },
  ],
};

export default function ContentEditor() {
  const { section } = useParams<{ section: string }>();
  const navigate = useNavigate();
  const { getSectionContent, updateContent, loading } = useCMS();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const fields = section ? sectionFields[section] || [] : [];
  const currentContent = section ? getSectionContent(section) : {};

  useEffect(() => {
    if (section && fields.length > 0) {
      const initialData: Record<string, string> = {};
      fields.forEach((field) => {
        const value = currentContent[field.field];
        if (value) {
          initialData[field.field] = 
            field.type === 'json' 
              ? JSON.stringify(value, null, 2)
              : String(value);
        } else {
          initialData[field.field] = '';
        }
      });
      setFormData(initialData);
    }
  }, [section, currentContent]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!section) return;

    setSaving(true);
    setSaveMessage(null);

    try {
      const updates: ContentUpdate[] = fields.map((fieldDef) => {
        const value = formData[fieldDef.field] || '';
        return {
          section,
          field: fieldDef.field,
          value: fieldDef.type === 'json' 
            ? (value ? JSON.parse(value) : {})
            : value,
        };
      });

      const result = await updateContent(updates);
      
      if (result.error) {
        setSaveMessage(`Error: ${result.error}`);
      } else {
        setSaveMessage('Content saved successfully!');
        setTimeout(() => setSaveMessage(null), 3000);
      }
    } catch (err) {
      setSaveMessage(`Error: ${err instanceof Error ? err.message : 'Failed to save'}`);
    } finally {
      setSaving(false);
    }
  };

  if (!section || fields.length === 0) {
    return (
      <div className="min-h-screen bg-space-dark flex items-center justify-center">
        <p className="text-clean-white">Section not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-space-dark p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-2xl font-bold text-clean-white mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Edit <span className="text-vibrant-green capitalize">{section}</span>
            </h1>
            <p className="text-clean-white/50 text-sm">Update content for this section</p>
          </div>
          <div className="flex items-center gap-4">
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

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {fields.map((fieldDef) => (
            <div key={fieldDef.field} className="p-6 rounded-2xl bg-gradient-to-br from-clean-white/5 to-clean-white/[0.02] border border-clean-white/10">
              <label className="block text-clean-white font-medium mb-2">
                {fieldDef.label}
              </label>
              {fieldDef.type === 'textarea' ? (
                <textarea
                  value={formData[fieldDef.field] || ''}
                  onChange={(e) => handleChange(fieldDef.field, e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-clean-white/5 border border-clean-white/10 text-clean-white placeholder-clean-white/30 focus:outline-none focus:border-vibrant-green transition-colors resize-y"
                  placeholder={`Enter ${fieldDef.label.toLowerCase()}...`}
                />
              ) : fieldDef.type === 'json' ? (
                <textarea
                  value={formData[fieldDef.field] || ''}
                  onChange={(e) => handleChange(fieldDef.field, e.target.value)}
                  rows={12}
                  className="w-full px-4 py-3 rounded-lg bg-clean-white/5 border border-clean-white/10 text-clean-white placeholder-clean-white/30 focus:outline-none focus:border-vibrant-green transition-colors font-mono text-sm resize-y"
                  placeholder='{"key": "value"}'
                />
              ) : (
                <input
                  type="text"
                  value={formData[fieldDef.field] || ''}
                  onChange={(e) => handleChange(fieldDef.field, e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-clean-white/5 border border-clean-white/10 text-clean-white placeholder-clean-white/30 focus:outline-none focus:border-vibrant-green transition-colors"
                  placeholder={`Enter ${fieldDef.label.toLowerCase()}...`}
                />
              )}
            </div>
          ))}

          {/* Save Button */}
          <div className="flex items-center justify-between pt-4">
            {saveMessage && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-sm ${
                  saveMessage.includes('Error') 
                    ? 'text-red-400' 
                    : 'text-vibrant-green'
                }`}
              >
                {saveMessage}
              </motion.p>
            )}
            <motion.button
              onClick={handleSave}
              disabled={saving || loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="ml-auto px-8 py-3 rounded-full bg-gradient-to-r from-cosmic-purple to-vibrant-green text-space-dark font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
