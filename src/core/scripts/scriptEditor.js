export function setupScriptEditor(engine){
  const ta=document.createElement("textarea");
  ta.id="scriptArea"; ta.placeholder="// JS";
  document.body.appendChild(ta);
  const btn=document.createElement("button");
  btn.textContent="Executar Script";
  document.body.appendChild(btn);
  btn.onclick=()=>{ try{ new Function("engine",ta.value)(engine); console.log("Rodou") }catch(e){ console.error(e); } };
}
