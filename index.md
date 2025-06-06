---
layout: default
title: Home
---
Cloud Native architect and developer with a passion for integration and automation, with more than 20 years experience as a back-end and cloud developer & architect. Feel free to contact me on any of my socials!
<link rel="stylesheet" href="/assets/css/index.css">
<div class="jump-links">
  <a href="#recent-presentations" class="jump-btn">Presentations</a>
  <a href="#events" class="jump-btn">Events</a>
</div>
<hr>
<div class="embeds-row">
  <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7331581446169497600?collapsed=1" height="265" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
  <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7329044756922105858?collapsed=1" height="265" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
</div>
<hr>
<h2 id="recent-presentations">Recent Presentations</h2>
<div class="gallery">
  <div class="gallery-item">
    <a href="https://slides.manfred.no/choo-choo" target="_blank" rel="noopener">
      <img src="{{ '/images/choo-choo-cover.png' | relative_url }}" alt="AI Talk Cover">
    </a>
    <div class="gallery-title">I choo-choo-choose you</div>
    <div class="gallery-subtitle">or how to build modern platforms in a 200 year old industry</div>
  </div>
  <div class="gallery-item">
    <a href="https://slides.manfred.no/eda-sms-to-now" target="_blank" rel="noopener">
      <img src="{{ '/images/eda-cover.png' | relative_url }}" alt="Train Industry Cover">
    </a>
    <div class="gallery-title">Event-Driven Architecture</div>
    <div class="gallery-subtitle">From SMS to Now, Why It Still Matters</div>
  </div>
  <!-- Add more presentations as needed -->
</div>
<hr>
<span id="events"></span>
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
