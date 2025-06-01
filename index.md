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

  // Find earliest event
  let soonestEventIdx = 0;
  let soonestDate = new Date(upcoming[0].eventStartDate);
  for (let i=1; i<upcoming.length; ++i) {
    const d = new Date(upcoming[i].eventStartDate);
    if (d < soonestDate) {
      soonestEventIdx = i;
      soonestDate = d;
    }
  }
  // Remove soonest from array for separate rendering
  const soonest = upcoming.splice(soonestEventIdx, 1)[0];

  document.getElementById('upcoming-events').innerHTML =
  `<li class="highlight">
    <span class="badge">Next up!</span>
    <a href="${soonest.website || '#'}" target="_blank" rel="noopener">
      <strong>${soonest.name}</strong>
    </a>
    <br>
    ${soonest.location ? `<span>${soonest.location}</span><br>` : ""}
    <span>
      ${formatDate(soonest.eventStartDate)}
      ${soonest.eventEndDate && soonest.eventEndDate !== soonest.eventStartDate ? " – " + formatDate(soonest.eventEndDate) : ''}
    </span>
  </li>`
  + upcoming.map(ev => `
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
  #upcoming-events li.highlight {
  border-left: 6px solid #ff9800;
  background: #333844;
  box-shadow: 0 2px 12px #23232d55;
}
#upcoming-events li.highlight em {
  color: #ff9800;
  font-weight: bold;
  font-style: normal;
  letter-spacing: 1px;
}
  #upcoming-events li.highlight .badge {
  display: inline-block;
  background-color: #ff9800;
  color: #23232d;
  font-weight: bold;
  font-size: 0.85em;
  border-radius: 10px;
  padding: 0.2em 0.7em;
  margin-bottom: 4px;
  margin-right: 8px;
  vertical-align: middle;
  letter-spacing: 0.5px;
  position: relative;
  top: -2px;
}
</style>
