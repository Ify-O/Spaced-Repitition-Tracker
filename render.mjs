// render.mjs
// Handles rendering the user's revision agenda

/**
 * Render a user's agenda into the given container element.
 * Groups revisions by topic and sorts by date.
 *
 * @param {Array} items - Array of revision objects { topic, date }
 * @param {HTMLElement} container - The DOM element to render the agenda into
 */
export function renderAgenda(items, container) {
  if (!items || items.length === 0) {
    container.innerHTML = "<p>No agenda for this user.</p>";
    return;
  }

  const today = new Date();

  // Filter out past dates and sort chronologically
  const upcomingItems = items
    .filter((item) => new Date(item.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (upcomingItems.length === 0) {
    container.innerHTML = "<p>No upcoming revisions.</p>";
    return;
  }

  