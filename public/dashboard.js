// public/dashboard.js
const container = document.getElementById('projectsList');

fetch('/api/project', {
  headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
})
  .then(res => res.json())
  .then(data => {
    if (!data.projects || data.projects.length === 0) {
      container.textContent = "Nenhum projeto encontrado.";
      return;
    }

    data.projects.forEach(project => {
      const el = document.createElement('div');
      el.classList.add('project-card');
      el.textContent = project.name;
      container.appendChild(el);
    });
  })
  .catch(err => {
    console.error('[NebulaForge] Erro ao carregar projetos:', err);
    container.textContent = "Erro ao carregar projetos.";
  });
