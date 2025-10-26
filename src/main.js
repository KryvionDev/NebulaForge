import { Engine } from "./core/engine.js";
import { setupEditor } from "./ui/editor.js";

const canvas=document.getElementById("gameCanvas")||document.createElement("canvas");
canvas.id="gameCanvas"; document.body.appendChild(canvas);

const engine=new Engine(canvas);
setupEditor(engine);
engine.start();
