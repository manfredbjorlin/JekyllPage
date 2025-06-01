---
layout: default
title: Home
---

# My sessions

<ul id="event-list"><li>Loading events…</li></ul>

<script>
const sessionizeApiUrl = "https://sessionize.com/api/speaker/json/42z601511p"; // 👈 Replace with your real endpoint

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

fetch(sessionizeApiUrl)
  .then(r => r.json())
  .then(data => {
    const events = data.events || [];
    if (!events.length) {
      document.getElementById('event-list').innerHTML = "<li>No events found.</li>";
      return;
    }
    document.getElementById('event-list').innerHTML = events.map(ev => `
      <li>
        <a href="${ev.website || '#'}" target="_blank" rel="noopener">
          <strong>${ev.name}</strong>
        </a><br>
        ${ev.location ? `<span>${ev.location}</span><br>` : ""}
        <span>
            ${formatDate(ev.eventStartDate)}
            ${ev.eventEndDate && ev.eventEndDate !== ev.eventStartDate ? " – " + formatDate(ev.eventEndDate) : ''}
        </span>
      </li>
    `).join('');
  })
  .catch(() => {
    document.getElementById('event-list').innerHTML = "<li>Couldn't load events.</li>";
  });
</script>
