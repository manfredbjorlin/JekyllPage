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
  <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7339191739951263744?collapsed=1" height="670" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
  <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7341728414334078976?collapsed=1" height="543" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>
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

<script src="/assets/js/formatDate.js"></script>
<script src="/assets/js/eventsLoader.js"></script>
<script>
const apiUrl = "https://sessionize.com/api/speaker/json/42z601511p";
window.loadEvents && window.loadEvents(apiUrl);
</script>
