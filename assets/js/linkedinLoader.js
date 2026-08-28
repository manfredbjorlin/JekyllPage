(function () {
  function metricIcon(type) {
    switch (type) {
      case 'reactions': return '👍';
      case 'comments': return '💬';
      case 'impressions': return '👁';
      case 'reach': return '📡';
      case 'engagementRate': return '📈';
      default: return '';
    }
  }

  function formatDate(isoString) {
    var d = new Date(isoString);
    return d.toLocaleString('en-GB', {
      timeZone: 'Europe/Oslo',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) + ' CET';
  }

  function formatMetricValue(metric) {
    if (metric.unit === 'percentage') return metric.value + '%';
    return metric.value.toLocaleString();
  }

  function buildCard(post) {
    var card = document.createElement('div');
    card.className = 'linkedin-card';

    var textEl = document.createElement('p');
    textEl.className = 'linkedin-text';
    var escaped = post.text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');
    textEl.innerHTML = escaped;

    var metricsEl = document.createElement('div');
    metricsEl.className = 'linkedin-metrics';
    post.metrics.forEach(function (m) {
      var chip = document.createElement('span');
      chip.className = 'linkedin-metric';
      chip.innerHTML = metricIcon(m.type) + ' <strong>' + formatMetricValue(m) + '</strong> ' + m.name;
      metricsEl.appendChild(chip);
    });

    var footer = document.createElement('div');
    footer.className = 'linkedin-footer';
    if (post.dueAt) {
      var timeEl = document.createElement('span');
      timeEl.className = 'linkedin-timestamp';
      timeEl.textContent = formatDate(post.dueAt);
      footer.appendChild(timeEl);
    }
    var link = document.createElement('a');
    link.href = post.externalLink;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'View on LinkedIn →';
    link.className = 'linkedin-link';
    footer.appendChild(link);

    card.appendChild(textEl);

    var toggle = document.createElement('button');
    toggle.className = 'linkedin-read-toggle';
    toggle.textContent = 'Read more ↓';
    toggle.addEventListener('click', function () {
      var expanded = textEl.classList.toggle('expanded');
      toggle.textContent = expanded ? 'Read less ↑' : 'Read more ↓';
    });
    card.appendChild(toggle);

    if (post.assets && post.assets.length > 0) {
      var assetsEl = document.createElement('div');
      assetsEl.className = 'linkedin-assets linkedin-assets--' + post.assets.length;
      var loadedCount = 0;
      post.assets.forEach(function (asset) {
        var img = document.createElement('img');
        img.alt = (asset.image && asset.image.altText) || '';
        img.className = 'linkedin-asset-img';
        img.loading = 'lazy';
        img.onerror = function () {
          img.remove();
          loadedCount--;
          if (assetsEl.children.length === 0) {
            assetsEl.remove();
          } else {
            assetsEl.className = 'linkedin-assets linkedin-assets--' + assetsEl.children.length;
          }
        };
        img.onload = function () { loadedCount++; };
        assetsEl.appendChild(img);
        img.src = asset.thumbnail || asset.source;
      });
      card.appendChild(assetsEl);
    }

    card.appendChild(metricsEl);
    card.appendChild(footer);
    return card;
  }

  function renderPosts(posts) {
    var latestContainer = document.getElementById('linkedin-latest');
    var restContainer = document.getElementById('linkedin-posts');
    var countsEl = document.getElementById('linkedin-toggle-counts');
    if (countsEl && posts.length > 1) {
      countsEl.textContent = '(' + (posts.length - 1) + ' more)';
    }

    posts.forEach(function (edge, idx) {
      var card = buildCard(edge.node);
      if (idx === 0 && latestContainer) {
        latestContainer.appendChild(card);
      } else if (restContainer) {
        restContainer.appendChild(card);
      }
    });
  }

  function loadLinkedInPosts(jsonPath) {
    fetch(jsonPath)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var posts = data && data.posts && data.posts.edges;
        if (posts) renderPosts(posts);
      })
      .catch(function (err) {
        console.error('Failed to load LinkedIn posts:', err);
      });
  }

  if (typeof window !== 'undefined') {
    window.loadLinkedInPosts = loadLinkedInPosts;
  }
})();
