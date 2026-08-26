// eventsLoader.js
// Loads and displays upcoming and past events from Sessionize API
function loadEvents(apiUrl) {
  fetch(apiUrl)
    .then(r => r.json())
    .then(data => {
      const today = new Date();
      const events = (data.events || []).slice();
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

      // Find the soonest upcoming event
      let soonest = null;
      if (upcoming.length) {
        let soonestIdx = 0;
        let soonestDate = new Date(upcoming[0].eventStartDate);
        for (let i = 1; i < upcoming.length; ++i) {
          const d = new Date(upcoming[i].eventStartDate);
          if (d < soonestDate) { soonestIdx = i; soonestDate = d; }
        }
        soonest = upcoming.splice(soonestIdx, 1)[0];
      }

      // Render next-up highlight above the fold
      const nextUpSection = document.getElementById('next-up-section');
      if (soonest) {
        nextUpSection.style.display = '';
        document.getElementById('next-up-event').innerHTML =
          `<li class="highlight">
            <span class="badge">Next up!</span>
            <a href="${soonest.website || '#'}" target="_blank" rel="noopener">
              <strong>${soonest.name}</strong>
            </a>
            <br>
            ${soonest.location ? `<span>${soonest.location}</span><br>` : ''}
            <span>
              ${window.formatDate(soonest.eventStartDate)}
              ${soonest.eventEndDate && soonest.eventEndDate !== soonest.eventStartDate ? ' – ' + window.formatDate(soonest.eventEndDate) : ''}
            </span>
          </li>`;
      } else {
        nextUpSection.style.display = 'none';
      }

      // Count label for the details toggle
      const totalUpcoming = upcoming.length;
      const countsEl = document.getElementById('events-toggle-counts');
      if (countsEl) {
        const parts = [];
        if (totalUpcoming > 0) parts.push(totalUpcoming + ' upcoming');
        if (past.length > 0) parts.push(past.length + ' past');
        countsEl.textContent = parts.length ? '(' + parts.join(', ') + ')' : '';
      }

      // Render full upcoming list inside details (excluding soonest)
      const upcomingSection = document.getElementById('upcoming-section');
      if (upcoming.length) {
        upcomingSection.style.display = '';
        document.getElementById('upcoming-count').innerHTML = '(' + upcoming.length + ')';
        document.getElementById('upcoming-events').innerHTML = upcoming.reverse().map(ev => `
          <li>
            <a href="${ev.website || '#'}" target="_blank" rel="noopener">
              <strong>${ev.name}</strong>
            </a>
            <br>
            ${ev.location ? `<span>${ev.location}</span><br>` : ''}
            <span>
              ${window.formatDate(ev.eventStartDate)}
              ${ev.eventEndDate && ev.eventEndDate !== ev.eventStartDate ? ' – ' + window.formatDate(ev.eventEndDate) : ''}
            </span>
          </li>
        `).join('');
      } else {
        upcomingSection.style.display = 'none';
      }

      document.getElementById('past-count').innerHTML = '(' + past.length + ')';
      document.getElementById('past-events').innerHTML = past.length
        ? past.map(ev => `
          <li>
            <a href="${ev.website || '#'}" target="_blank" rel="noopener">
              <strong>${ev.name}</strong>
            </a>
            <br>
            ${ev.location ? `<span>${ev.location}</span><br>` : ''}
            <span>
              ${window.formatDate(ev.eventStartDate)}
              ${ev.eventEndDate && ev.eventEndDate !== ev.eventStartDate ? ' – ' + window.formatDate(ev.eventEndDate) : ''}
            </span>
          </li>
        `).join('')
        : '<li>None</li>';
    })
    .catch(() => {
      document.getElementById('next-up-section').style.display = 'none';
      document.getElementById('upcoming-section').style.display = 'none';
      document.getElementById('past-events').innerHTML = "<li>Couldn't load events.</li>";
    });
}
typeof window !== 'undefined' && (window.loadEvents = loadEvents);
