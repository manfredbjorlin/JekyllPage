// formatDate.js
// Returns a formatted date string from an ISO date string.
function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}
// Export for use in browser
typeof window !== 'undefined' && (window.formatDate = formatDate);
