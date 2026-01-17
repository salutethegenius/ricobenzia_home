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

// Load events from Supabase
// Returns array if successful (empty array means no events), null if failed
async function loadEventsFromSupabase(): Promise<Event[] | null> {
  try {
    const { supabase } = await import('../lib/supabase');
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) throw error;
    // If data is null, return null (error case)
    // If data is an array (even if empty), return it (success case)
    return data ? (data as Event[]) : null;
  } catch (error) {
    // Table might not exist yet, or connection failed
    console.warn('Failed to load events from Supabase:', error);
    return null;
  }
}

// Load events from JSON file
async function loadEventsFromJSON(): Promise<Event[] | null> {
  try {
    const response = await fetch('/data/events.json');
    if (!response.ok) {
      throw new Error('Failed to fetch events.json');
    }
    const data: EventsData = await response.json();
    return data.events || null;
  } catch (error) {
    console.warn('Failed to load events from JSON:', error);
    return null;
  }
}

// Clean up past events from storage (removes events that passed more than 1 day ago)
async function cleanupPastEvents(eventsList: Event[]): Promise<Event[]> {
  const filteredEvents = filterPastEvents(eventsList);
  
  // If events were filtered out, save the cleaned list back to storage
  if (filteredEvents.length < eventsList.length) {
    try {
      await saveEvents(filteredEvents);
      console.log(`Cleaned up ${eventsList.length - filteredEvents.length} past event(s)`);
    } catch (error) {
      console.warn('Failed to save cleaned events:', error);
    }
  }
  
  return filteredEvents;
}

// Load events - prioritizes Supabase, then localStorage, then JSON
// Automatically cleans up past events (more than 1 day old) when loading
export async function loadEvents(forceRefresh: boolean = false): Promise<Event[]> {
  // Clear cache if force refresh is requested
  if (forceRefresh) {
    eventsCache = null;
  }

  // Check cache first (unless force refresh)
  if (eventsCache && !forceRefresh) {
    return eventsCache;
  }

  // Priority 1: Try to load from Supabase first
  try {
    const supabaseEvents = await loadEventsFromSupabase();
    // If supabaseEvents is not null, use it (even if empty array - means Supabase succeeded but no events)
    if (supabaseEvents !== null) {
      // Clean up past events
      const cleanedEvents = await cleanupPastEvents(supabaseEvents);
      eventsCache = cleanedEvents;
      updateExportedEvents(cleanedEvents);
      return eventsCache;
    }
    // If supabaseEvents is null, Supabase failed, so fall through to localStorage
  } catch (error) {
    console.warn('Failed to load events from Supabase, trying localStorage:', error);
  }

  // Priority 2: Fallback to localStorage
  const localEvents = loadEventsFromLocalStorage();
  if (localEvents && localEvents.length > 0) {
    // Clean up past events
    const cleanedEvents = await cleanupPastEvents(localEvents);
    eventsCache = cleanedEvents;
    updateExportedEvents(cleanedEvents);
    return eventsCache;
  }

  // Priority 3: Fallback to JSON file
  try {
    const jsonEvents = await loadEventsFromJSON();
    if (jsonEvents) {
      // Clean up past events
      const cleanedEvents = await cleanupPastEvents(jsonEvents);
      eventsCache = cleanedEvents;
      updateExportedEvents(cleanedEvents);
      return eventsCache;
    }
  } catch (error) {
    console.warn('Failed to load events from JSON:', error);
  }

  // Return empty array as final fallback
  eventsCache = [];
  updateExportedEvents([]);
  return [];
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
  // Don't clear the exported events array here - let loadEvents handle it
}

// Refresh events by clearing cache and reloading
export async function refreshEvents(): Promise<Event[]> {
  clearEventsCache();
  return await loadEvents(true);
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

// Helper function to check if an event is happening today (LIVE)
export const isEventLive = (event: Event): boolean => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    
    // Parse event date (YYYY-MM-DD format)
    const [year, month, day] = event.date.split('-').map(Number);
    const eventDate = new Date(year, month - 1, day);
    eventDate.setHours(0, 0, 0, 0);
    
    // Check if event date is today
    return eventDate.getTime() === today.getTime();
  } catch {
    return false;
  }
};

// Helper function to check if an event has passed (more than 1 day ago)
export const isEventPast = (event: Event): boolean => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    
    // Parse event date (YYYY-MM-DD format)
    const [year, month, day] = event.date.split('-').map(Number);
    const eventDate = new Date(year, month - 1, day);
    eventDate.setHours(0, 0, 0, 0);
    
    // Calculate difference in days
    const diffTime = today.getTime() - eventDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    // Event is past if it's more than 1 day ago (i.e., >= 2 days old)
    return diffDays >= 2;
  } catch {
    return false;
  }
};

// Helper function to filter out past events (events that passed more than 1 day ago)
export const filterPastEvents = (eventsList: Event[]): Event[] => {
  return eventsList.filter(event => !isEventPast(event));
};

// Helper function to get events from the current year
// Automatically rolls over to the next year when the calendar year changes
// Also automatically filters out past events (more than 1 day old)
export const getUpcomingEvents = (eventsList?: Event[]): Event[] => {
  const now = new Date();
  const currentYear = now.getFullYear(); // Dynamically gets the current year
  const currentEvents = eventsList || (events.length > 0 ? events : getEvents());
  return currentEvents
    .filter(event => {
      try {
        // Filter events to show only events from the current year (automatically updates each year)
        const eventDate = new Date(event.date);
        const eventYear = eventDate.getFullYear();
        return eventYear === currentYear;
      } catch {
        // If parsing fails, include the event
        return true;
      }
    })
    .filter(event => !isEventPast(event)) // Filter out past events (more than 1 day old)
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
// Fixes timezone issue by parsing date string directly instead of using Date constructor
export const formatEventDate = (dateString: string): string => {
  try {
    // Parse YYYY-MM-DD format directly to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed in Date constructor
    
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    // Fallback to original method if parsing fails
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
};
