---
layout: default
title: Previous Speaks
---
<link rel="stylesheet" href="/assets/css/index.css">

<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5em;">
  <h2 style="margin:0;">🎥 Recordings</h2>
  <a href="/" class="jump-btn">← Back</a>
</div>
<p>Recordings of past conference talks and presentations.</p>

<div id="youtube-gallery" class="gallery">
  <p>Loading recordings...</p>
</div>

<script src="/assets/js/youtubeLoader.js"></script>
<script>
window.loadYouTubeVideos && window.loadYouTubeVideos('/assets/data/youtube.json');
</script>
