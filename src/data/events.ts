export interface Event {
  id: string;
  title: string;
  date: string; // Format: YYYY-MM-DD
  time: string;
  description: string;
  link?: string;
  image?: string;
}

interface EventsData {
  events: Event[];
}

// Cache for events
let eventsCache: Event[] | null = null;

// Load events from localStorage
function loadEventsFromLocalStorage(): Event[] | null {
  try {
    const stored = localStorage.getItem('ricobenzia_events');
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : null;
    }
  } catch (error) {
    console.warn('Failed to load events from localStorage:', error);
  }
  return null;
}

// Load events from JSON file
export async function loadEvents(): Promise<Event[]> {
  // Check cache first
  if (eventsCache) {
    return eventsCache;
  }

  // Try to load from localStorage first (most recent)
  const localEvents = loadEventsFromLocalStorage();
  if (localEvents && localEvents.length > 0) {
    eventsCache = localEvents;
    // Update exported events array synchronously
    updateExportedEvents(localEvents);
    return eventsCache;
  }

  try {
    // Try to load from Supabase (if available)
    const supabaseEvents = await loadEventsFromSupabase();
    if (supabaseEvents && supabaseEvents.length > 0) {
      eventsCache = supabaseEvents;
      updateExportedEvents(supabaseEvents);
      return eventsCache;
    }
  } catch (error) {
    console.warn('Failed to load events from Supabase, falling back to JSON:', error);
  }

  // Fallback to JSON file
  try {
    const response = await fetch('/data/events.json');
    if (!response.ok) {
      throw new Error('Failed to fetch events.json');
    }
    const data: EventsData = await response.json();
    eventsCache = data.events || [];
    updateExportedEvents(eventsCache);
    return eventsCache;
  } catch (error) {
    console.error('Failed to load events from JSON:', error);
    // Return empty array as fallback
    eventsCache = [];
    updateExportedEvents([]);
    return [];
  }
}

// Load events from Supabase
async function loadEventsFromSupabase(): Promise<Event[] | null> {
  try {
    const { supabase } = await import('../lib/supabase');
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) throw error;
    return data as Event[];
  } catch {
    // Table might not exist yet, that's okay
    return null;
  }
}

// Save events to Supabase
export async function saveEvents(events: Event[]): Promise<{ error: string | null }> {
  try {
    const { supabase } = await import('../lib/supabase');
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      // Fallback to localStorage if not authenticated
      localStorage.setItem('ricobenzia_events', JSON.stringify(events));
      eventsCache = events;
      updateExportedEvents(events);
      window.dispatchEvent(new CustomEvent('eventsUpdated', { detail: events }));
      return { error: null };
    }

    // Delete all existing events and insert new ones
    // First, get all existing event IDs to delete them
    const { data: existingEvents, error: selectError } = await supabase
      .from('events')
      .select('id');
    
    // If select fails, table might not exist - that's okay, we'll try to insert anyway
    if (!selectError && existingEvents && existingEvents.length > 0) {
      const idsToDelete = existingEvents.map(e => e.id);
      const { error: deleteError } = await supabase
        .from('events')
        .delete()
        .in('id', idsToDelete);

      if (deleteError) throw deleteError;
    }

    // Insert new events
    const { error: insertError } = await supabase
      .from('events')
      .insert(events);

    if (insertError) throw insertError;

    // Update cache and exported events array
    eventsCache = events;
    updateExportedEvents(events);
    window.dispatchEvent(new CustomEvent('eventsUpdated', { detail: events }));
    return { error: null };
  } catch (error) {
      // Fallback to localStorage
      try {
        localStorage.setItem('ricobenzia_events', JSON.stringify(events));
        eventsCache = events;
        updateExportedEvents(events);
        window.dispatchEvent(new CustomEvent('eventsUpdated', { detail: events }));
        return { error: null };
      } catch {
        const errorMessage = error instanceof Error ? error.message : 'Failed to save events';
        return { error: errorMessage };
      }
  }
}

// Clear cache (useful for refreshing)
export function clearEventsCache(): void {
  eventsCache = null;
  updateExportedEvents([]);
}

// Get events (synchronous for backward compatibility, loads from cache)
export function getEvents(): Event[] {
  // Return cache if available, otherwise return empty array
  // Components should use loadEvents() for async loading
  return eventsCache || [];
}

// Initialize events (call this at app startup)
export async function initializeEvents(): Promise<void> {
  await loadEvents();
}

// Generate a unique ID for new events
export function generateEventId(): string {
  return Date.now().toString() + Math.random().toString(36).substring(2, 11);
}

// Get events array (for backward compatibility)
// This will be populated after loadEvents() is called
export let events: Event[] = [];

// Helper to update exported events array
function updateExportedEvents(newEvents: Event[]): void {
  events = newEvents;
}

// Initialize on module load
loadEvents().then(loadedEvents => {
  updateExportedEvents(loadedEvents);
}).catch(() => {
  updateExportedEvents([]);
});

// Helper function to get upcoming events
export const getUpcomingEvents = (): Event[] => {
  const now = new Date();
  const currentEvents = events.length > 0 ? events : getEvents();
  return currentEvents
    .filter(event => {
      try {
        // Try to parse the date and time
        const timeMatch = event.time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
        if (timeMatch) {
          let hours = parseInt(timeMatch[1]);
          const minutes = parseInt(timeMatch[2]);
          const ampm = timeMatch[3].toUpperCase();
          
          if (ampm === 'PM' && hours !== 12) hours += 12;
          if (ampm === 'AM' && hours === 12) hours = 0;
          
          const eventDate = new Date(event.date);
          eventDate.setHours(hours, minutes, 0, 0);
          return eventDate > now;
        }
        // Fallback: just compare dates
        const eventDate = new Date(event.date);
        return eventDate >= new Date(now.toDateString());
      } catch {
        // If parsing fails, include the event
        return true;
      }
    })
    .sort((a, b) => {
      try {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      } catch {
        return 0;
      }
    });
};

// Helper function to format date
export const formatEventDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
