function showView(view) {
  document.getElementById('table-view').style.display = (view === 'table') ? '' : 'none';
  document.getElementById('cards-view').style.display = (view === 'cards') ? '' : 'none';
  document.getElementById('grid-view').style.display = (view === 'grid') ? '' : 'none';
  Array.from(document.querySelectorAll('.nav-links button')).forEach(btn => {
    btn.classList.toggle('active', btn.textContent.toLowerCase() === view);
  });
}

function renderTable(data, headers) {
  let html = '<table><thead><tr>';
  headers.forEach(h => html += `<th>${h}</th>`);
  html += '</tr></thead><tbody>';
  data.forEach(row => {
    html += '<tr>' + headers.map(h => `<td>${row[h] || ''}</td>`).join('') + '</tr>';
  });
  html += '</tbody></table>';
  document.getElementById('table-view').innerHTML = html;
}

function renderCards(data, headers) {
  let html = '';
  data.forEach(row => {
    html += '<div class="card">';
    headers.forEach(h => {
      html += `<div><strong>${h}:</strong> ${row[h] || ''}</div>`;
    });
    html += '</div>';
  });
  document.getElementById('cards-view').innerHTML = html;
}

function renderGrid(data, headers) {
  let html = '';
  data.forEach(row => {
    html += '<div class="grid-card">';
    headers.forEach(h => {
      html += `<div><strong>${h}:</strong> ${row[h] || ''}</div>`;
    });
    html += '</div>';
  });
  document.getElementById('grid-view').innerHTML = html;
}

function loadSeeds() {
  google.script.run.withSuccessHandler(function(seeds) {
    if (!seeds || seeds.length === 0) return;
    const headers = Object.keys(seeds[0]);
    renderTable(seeds, headers);
    renderCards(seeds, headers);
    renderGrid(seeds, headers);
  }).readAllSeeds();
}

document.addEventListener('DOMContentLoaded', function() {
  showView('table');
  loadSeeds();
});
