export function setupScriptEditor(engine) {
  // Container do editor
  const container = document.createElement("div");
  container.id = "scriptEditorContainer";
  container.style.position = "absolute";
  container.style.bottom = "10px";
  container.style.right = "10px";
  container.style.width = "400px";
  container.style.height = "300px";
  container.style.background = "#1a1a1a";
  container.style.border = "1px solid #333";
  container.style.borderRadius = "6px";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.zIndex = "1000";
  container.style.padding = "8px";
  container.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";

  // Textarea
  const ta = document.createElement("textarea");
  ta.id = "scriptArea";
  ta.placeholder = "// Digite JS aqui...";
  ta.style.flex = "1";
  ta.style.background = "#111";
  ta.style.color = "#eee";
  ta.style.border = "none";
  ta.style.resize = "none";
  ta.style.padding = "6px";
  ta.style.fontFamily = "monospace";
  ta.style.fontSize = "13px";
  container.appendChild(ta);

  // Botão de execução
  const btn = document.createElement("button");
  btn.textContent = "Executar Script";
  btn.style.marginTop = "6px";
  btn.style.padding = "6px";
  btn.style.background = "#222";
  btn.style.color = "#fff";
  btn.style.border = "none";
  btn.style.borderRadius = "4px";
  btn.style.cursor = "pointer";
  btn.onmouseover = () => btn.style.background = "#333";
  btn.onmouseout = () => btn.style.background = "#222";

  btn.onclick = () => {
    try {
      new Function("engine", ta.value)(engine);
      console.log("Script executado com sucesso");
    } catch (e) {
      console.error("Erro ao executar script:", e);
    }
  };
  container.appendChild(btn);

  // Adiciona no body
  document.body.appendChild(container);

  // Retorna referências caso queira manipular externamente
  return { container, textarea: ta, button: btn };
}
