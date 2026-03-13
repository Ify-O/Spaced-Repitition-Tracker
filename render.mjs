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
  today.setHours(0, 0, 0, 0);

  // Filter upcoming dates and sort
  const upcomingItems = items
    .filter((item) => new Date(item.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (upcomingItems.length === 0) {
    container.innerHTML = "<p>No upcoming revisions.</p>";
    return;
  }

  // Group revisions by topic
  const grouped = upcomingItems.reduce((acc, item) => {
    if (!acc[item.topic]) {
      acc[item.topic] = [];
    }

    acc[item.topic].push(formatDate(item.date));
    return acc;
  }, {});

  // Build HTML
  const html = Object.entries(grouped)
    .map(([topic, dates]) => {
      return `<li><strong>${topic}</strong>: ${dates.join(", ")}</li>`;
    })
    .join("");

  container.innerHTML = `<ul>${html}</ul>`;
}

/**
 * Format a date string as "Month Day, Year"
 *
 * @param {string} dateString
 * @returns {string}
 */
export function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(dateString).toLocaleDateString(undefined, options);
}
