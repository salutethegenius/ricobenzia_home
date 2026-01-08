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
  privacy: [
    { field: 'introduction', label: 'Introduction', type: 'textarea' },
    { field: 'information_collect', label: 'Information We Collect', type: 'textarea' },
    { field: 'how_use', label: 'How We Use Your Information', type: 'textarea' },
    { field: 'cookies', label: 'Cookies and Tracking Technologies', type: 'textarea' },
    { field: 'third_party', label: 'Third-Party Services', type: 'textarea' },
    { field: 'data_security', label: 'Data Security', type: 'textarea' },
    { field: 'your_rights', label: 'Your Rights', type: 'textarea' },
    { field: 'children_privacy', label: "Children's Privacy", type: 'textarea' },
    { field: 'changes_policy', label: 'Changes to This Policy', type: 'textarea' },
    { field: 'contact', label: 'Contact Us', type: 'textarea' },
  ],
  terms: [
    { field: 'acceptance', label: 'Acceptance of Terms', type: 'textarea' },
    { field: 'educational_purpose', label: 'Educational and Entertainment Purpose', type: 'textarea' },
    { field: 'risk_disclaimer', label: 'Risk Disclaimer', type: 'textarea' },
    { field: 'user_conduct', label: 'User Conduct', type: 'textarea' },
    { field: 'intellectual_property', label: 'Intellectual Property', type: 'textarea' },
    { field: 'third_party_links', label: 'Third-Party Links and Services', type: 'textarea' },
    { field: 'no_investment_advice', label: 'No Investment Advice', type: 'textarea' },
    { field: 'limitation_liability', label: 'Limitation of Liability', type: 'textarea' },
    { field: 'indemnification', label: 'Indemnification', type: 'textarea' },
    { field: 'termination', label: 'Termination', type: 'textarea' },
    { field: 'governing_law', label: 'Governing Law', type: 'textarea' },
    { field: 'changes_terms', label: 'Changes to Terms', type: 'textarea' },
    { field: 'contact_info', label: 'Contact Information', type: 'textarea' },
  ],
};

export default function ContentEditor() {
  const { section } = useParams<{ section: string }>();
  const navigate = useNavigate();
  const { updateContent, loading, content } = useCMS();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const fields = section ? sectionFields[section] || [] : [];
  
  // Get current content for the section
  const currentContent = section ? (content[section] || {}) : {};
  
  // Serialize content for stable dependency comparison
  const contentKey = JSON.stringify(currentContent);

  useEffect(() => {
    // Wait for loading to complete before initializing form
    if (!section || fields.length === 0 || loading) {
      return;
    }

    const initialData: Record<string, string> = {};
    fields.forEach((field) => {
      const value = currentContent[field.field];
      if (value !== undefined && value !== null && value !== '') {
        initialData[field.field] = 
          field.type === 'json' 
            ? JSON.stringify(value, null, 2)
            : String(value);
      } else {
        initialData[field.field] = '';
      }
    });
    
    // Always set formData when content is loaded (even if empty)
    setFormData(initialData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section, loading, fields.length, contentKey]);

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
        let parsedValue;
        if (fieldDef.type === 'json' && value) {
          parsedValue = JSON.parse(value);
        }
        return {
          section,
          field: fieldDef.field,
          value: fieldDef.type === 'json' 
            ? (parsedValue || {})
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
            <p className="text-clean-white/50 text-sm">
              {loading ? 'Loading content...' : 'Update content for this section'}
            </p>
            {!loading && Object.keys(currentContent).length === 0 && (
              <p className="text-yellow-400/70 text-xs mt-1">
                No existing content found. Fill in the fields below to create content.
              </p>
            )}
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

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-vibrant-green border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Form */}
        {!loading && (
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
        )}
      </div>
    </div>
  );
}
