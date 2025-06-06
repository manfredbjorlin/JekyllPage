// eventsLoader.js
// Loads and displays upcoming and past events from Sessionize API
function loadEvents(apiUrl) {
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
            ${window.formatDate(soonest.eventStartDate)}
            ${soonest.eventEndDate && soonest.eventEndDate !== soonest.eventStartDate ? " – " + window.formatDate(soonest.eventEndDate) : ''}
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
              ${window.formatDate(ev.eventStartDate)}
              ${ev.eventEndDate && ev.eventEndDate !== ev.eventStartDate ? " – " + window.formatDate(ev.eventEndDate) : ''}
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
              ${window.formatDate(ev.eventStartDate)}
              ${ev.eventEndDate && ev.eventEndDate !== ev.eventStartDate ? " – " + window.formatDate(ev.eventEndDate) : ''}
            </span>
          </li>
          `).join("")
        : '<li>None</li>';
    })
    .catch(() => {
      document.getElementById('upcoming-section').style.display = "none";
      document.getElementById('past-events').innerHTML = "<li>Couldn't load events.</li>";
    });
}
// Export for use in browser
typeof window !== 'undefined' && (window.loadEvents = loadEvents);
