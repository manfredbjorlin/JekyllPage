---
layout: default
title: Home
---
Cloud Native architect and developer with a passion for integration and automation, with more than 20 years experience as a back-end and cloud developer & architect. Feel free to contact me on any of my socials!
<link rel="stylesheet" href="/assets/css/index.css">
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
