---
layout: default
title: Home
---
Cloud Native architect and developer with a passion for integration and automation, with more than 20 years experience as a back-end and cloud developer & architect. Feel free to contact me on any of my socials!
<link rel="stylesheet" href="/assets/css/index.css">
<hr>

<div id="next-up-section" style="display:none">
  <ul id="next-up-event"></ul>
</div>

<div id="latest-linkedin-section" style="margin-top:2em;">
  <h2>💼 Latest Post</h2>
  <div id="linkedin-latest"></div>
</div>

<details id="events-details">
  <summary class="section-toggle"><span id="events-toggle-label">All Events</span> <span id="events-toggle-counts"></span></summary>
  <div class="details-content">
    <div id="upcoming-section" style="display:none">
      <h3>Upcoming <span id="upcoming-count"></span></h3>
      <ul id="upcoming-events"></ul>
    </div>
    <h3>Past <span id="past-count"></span></h3>
    <ul id="past-events"></ul>
  </div>
</details>

<details id="linkedin-details">
  <summary class="section-toggle">More LinkedIn Posts <span id="linkedin-toggle-counts"></span></summary>
  <div class="details-content">
    <div id="linkedin-posts"></div>
  </div>
</details>

<script src="/assets/js/formatDate.js"></script>
<script src="/assets/js/eventsLoader.js"></script>
<script src="/assets/js/linkedinLoader.js"></script>
<script>
const apiUrl = "https://sessionize.com/api/speaker/json/42z601511p";
window.loadEvents && window.loadEvents(apiUrl);
window.loadLinkedInPosts && window.loadLinkedInPosts('/assets/data/linkedin.json');
</script>
