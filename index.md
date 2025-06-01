---
layout: default
title: Home
---
<div class="jump-links">
  <a href="#recent-presentationsn">Presentations</a>
  <a href="#events">Events</a>
</div>
<style>
 .jump-links {
  display: flex;
  justify-content: center;
  gap: 2em;
  margin-bottom: 1.5em;
  font-size: 1.1em;
  margin-top: 2em !important;
}
.jump-links a {
  text-decoration: none;
  /*color: inherit;*/
}
section #title {
   margin-bottom: opx !important; 
}
</style>

<div class="embeds-row">
  <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7331581446169497600?collapsed=1" height="265" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
  <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7329044756922105858?collapsed=1" height="265" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
</div>
<style>
  .embeds-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: -60px; 
  margin-right: -60px;
}
.embeds-row iframe {
  flex: 1 1 320px;
  max-width: 350px;
}
</style>
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

<style>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5em;
  margin: 2em 0;
}
.gallery-item {
  background: #23232d;
  border-radius: 10px;
  box-shadow: 0 2px 10px #0002;
  overflow: hidden;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding-bottom: 0.8em;
}
.gallery-item a {
  display: block;
  transition: transform 0.13s;
}
.gallery-item a:hover img {
  transform: scale(1.04) rotate(-0.2deg);
  box-shadow: 0 8px 24px #2fd4ff30;
}
.gallery-item img {
  display: block;
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-bottom: 1px solid #222b;
  background: #18181c;
  transition: transform 0.13s, box-shadow 0.18s;
}
.gallery-title {
  margin-top: 0.9em;
  font-size: 1.1em;
  font-weight: bold;
  color: #fff;
  text-align: center;
  letter-spacing: 0.01em;
}
.gallery-subtitle {
  font-size: 0.97em;
  color: #8adbf8;
  text-align: center;
  margin: 0.5em 0 0;
  opacity: 0.84;
}
</style>

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
