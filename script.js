
// ================== STATE ==================
const state = {
  theme: 'dark',
  view: 'dashboard',
  modules: []
};

for (let i = 1; i <= 300; i++) {
  state.modules.push({
    id: i,
    name: `Module ${i}`,
    status: i % 3 === 0 ? 'inactive' : 'active',
    load: () => `Runtime data for module ${i}`
  });
}

// ================== ROUTER ==================
const routes = {
  dashboard: renderDashboard,
  modules: renderModules,
  analytics: renderAnalytics
};

function navigate(view) {
  state.view = view;
  document.getElementById('view-title').textContent = view.toUpperCase();
  routes[view]();
}

// ================== RENDER ==================
function renderDashboard() {
  const view = document.getElementById('view');
  view.innerHTML = `<h2>System Dashboard</h2>
    <p>Total modules: ${state.modules.length}</p>
    <p>Active: ${state.modules.filter(m=>m.status==='active').length}</p>`;
}

function renderModules() {
  const view = document.getElementById('view');
  view.innerHTML = '';
  state.modules.forEach(m => {
    const div = document.createElement('div');
    div.className = `panel-${m.id}`;
    div.innerHTML = `<strong>${m.name}</strong><br>Status: ${m.status}`;
    view.appendChild(div);
  });
}

function renderAnalytics() {
  const view = document.getElementById('view');
  let active = 0;
  let inactive = 0;
  state.modules.forEach(m => m.status === 'active' ? active++ : inactive++);
  view.innerHTML = `<h2>Analytics</h2>
    <p>Active modules: ${active}</p>
    <p>Inactive modules: ${inactive}</p>`;
}

// ================== UI ==================
function initNav() {
  const nav = document.getElementById('nav');
  ['dashboard','modules','analytics'].forEach(v => {
    const a = document.createElement('a');
    a.textContent = v;
    a.onclick = () => navigate(v);
    nav.appendChild(a);
  });
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = state.theme;
}

// ================== INIT ==================
document.getElementById('toggle-theme').onclick = toggleTheme;
initNav();
navigate('dashboard');
