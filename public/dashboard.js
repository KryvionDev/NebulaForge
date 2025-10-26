<!DOCTYPE html>
<html lang="pt-br">
<head><meta charset="UTF-8"><title>Dashboard</title><link rel="stylesheet" href="style.css"></head>
<body>
<h1>Meus Projetos</h1>
<div id="projectsList"></div>
<script type="module">
  const container=document.getElementById('projectsList');
  fetch('/api/project',{headers:{'Authorization':'Bearer '+localStorage.getItem('token')}})
    .then(r=>r.json()).then(d=>{ d.projects.forEach(p=>{ const el=document.createElement('div'); el.textContent=p.name; container.appendChild(el); }) });
</script>
</body>
</html>
