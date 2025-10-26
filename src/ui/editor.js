import { setupPanels } from "./panels.js";
import { setupScriptEditor } from "../scripts/scriptEditor.js";

export function setupEditor(engine){
  setupPanels();
  setupScriptEditor(engine);
  document.getElementById("btn-scene").onclick=()=>alert("Cenas em construção");
  document.getElementById("btn-assets").onclick=()=>alert("Assets em construção");
  document.getElementById("btn-script").onclick=()=>document.getElementById("scriptArea").style.display="block";
}
