---
layout: default
title: Home
---

# My events
Follow my journey of speaking at events

<div id="upcoming-section" style="display:none">
  <h2>Upcoming Events</h2>
  <ul id="upcoming-events"></ul>
</div>

<h2>Past Events</h2>
<ul id="past-events"></ul>

<script>
const apiUrl = "https://sessionize.com/api/speaker/json/42z601511p"; // Replace with your ID

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

fetch(apiUrl)
  .then(r => r.json())
  .then(data => {
    const today = new Date();
    const events = (data.events || []).slice();
    // Sort so most recent events (future or past) come first
    events.sort((a, b) => new Date(b.eventStartDate) - new Date(a.eventStartDate));
    const upcoming = [], past = [];

    for (const ev of events) {
      const endDate = ev.eventEndDate ? new Date(ev.eventEndDate) : null;
      const startDate = ev.eventStartDate ? new Date(ev.eventStartDate) : null;
      if (
        (endDate && endDate >= today) ||
        (!endDate && startDate && startDate >= today)
      ) {
        upcoming.push(ev);
      } else {
        past.push(ev);
      }
    }

    // Show or hide upcoming events section
    const upcomingSection = document.getElementById("upcoming-section");
    if (upcoming.length) {
      upcomingSection.style.display = "";
      document.getElementById('upcoming-events').innerHTML = upcoming.map(ev => `
        <li>
          <a href="${ev.website || '#'}" target="_blank" rel="noopener">
            <strong>${ev.name}</strong>
          </a>
          <br>
          ${ev.location ? `<span>${ev.location}</span><br>` : ""}
          <span>
            ${formatDate(ev.eventStartDate)}
            ${ev.eventEndDate && ev.eventEndDate !== ev.eventStartDate ? " – " + formatDate(ev.eventEndDate) : ''}
          </span>
        </li>
      `).join('');
    } else {
      upcomingSection.style.display = "none";
    }

    // Always show Past Events
    document.getElementById('past-events').innerHTML = past.length
      ? past.map(ev => `
        <li>
          <a href="${ev.website || '#'}" target="_blank" rel="noopener">
            <strong>${ev.name}</strong>
          </a>
          <br>
          ${ev.location ? `<span>${ev.location}</span><br>` : ""}
          <span>
            ${formatDate(ev.eventStartDate)}
            ${ev.eventEndDate && ev.eventEndDate !== ev.eventStartDate ? " – " + formatDate(ev.eventEndDate) : ''}
          </span>
        </li>
        `).join("")
      : '<li>None</li>';
  })
  .catch(() => {
    document.getElementById('upcoming-section').style.display = "none";
    document.getElementById('past-events').innerHTML = "<li>Couldn't load events.</li>";
  });
</script>

<style>
#upcoming-events, #past-events {
  list-style: none;
  padding: 0;
  margin-left: 0;
}
#upcoming-events li, #past-events li {
  margin-bottom: 1.5em;
  background: #434343;
  padding: 1em;
  border-radius: 6px;
  border-left: 3px solid #578210;
}
#upcoming-events strong, #past-events strong { color: #fff; }
#upcoming-events span, #past-events span { color: #cfcfcf; }
</style>
