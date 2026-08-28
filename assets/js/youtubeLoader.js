async function loadYouTubeVideos(jsonUrl) {
  const container = document.getElementById('youtube-gallery');
  if (!container) return;

  try {
    const res = await fetch(jsonUrl);
    const data = await res.json();
    const videos = data.videos || [];

    if (videos.length === 0) {
      container.innerHTML = '<p>No recordings available yet.</p>';
      return;
    }

    container.innerHTML = videos.map(video => {
      const presenters = (video.presenters || [])
        .map(p => p.url ? `<a href="${p.url}" target="_blank" rel="noopener">${p.name}</a>` : p.name)
        .join(' & ');

      const thumbSrc = video.thumbnail
        ? `/images/youtube/${video.thumbnail}`
        : '';

      const thumbHtml = thumbSrc
        ? `<img src="${thumbSrc}" alt="${video.title}" loading="lazy">`
        : `<div style="aspect-ratio:16/9;background:#18181c;display:flex;align-items:center;justify-content:center;color:#555;font-size:2em;">▶</div>`;

      return `
        <div class="gallery-item">
          <a href="${video.url}" target="_blank" rel="noopener">
            ${thumbHtml}
          </a>
          <div class="gallery-title">${video.title}</div>
          ${presenters ? `<div class="gallery-subtitle">${presenters}</div>` : ''}
        </div>`;
    }).join('');
  } catch (e) {
    container.innerHTML = '<p>Failed to load recordings.</p>';
  }
}

if (typeof window !== 'undefined') {
  window.loadYouTubeVideos = loadYouTubeVideos;
}
