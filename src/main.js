import { Engine } from './core/engine.js';
import { Renderer } from './core/renderer.js';
import { Physics } from './core/physics.js';
import { Input } from './core/input.js';
import { SceneManager } from './scenes/sceneManager.js';
import { setupEditor } from './ui/editor.js';
import { UserAuth } from './user/auth.js';

(async function initializeNebulaForge() {
  console.log("%c[NebulaForge] Booting Engine...", "color:#3b82f6;font-weight:bold;");

  // Login check
  const user = await UserAuth.verifySession();
  if(!user) {
    window.location.href = "/dashboard.html";
    return;
  }

  let canvas = document.getElementById("editorCanvas");
  if(!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "editorCanvas";
    document.body.appendChild(canvas);
  }

  const engine = new Engine(canvas);
  const renderer = new Renderer(canvas);
  const physics = new Physics();
  const input = new Input();
  const sceneManager = new SceneManager(engine);

  engine.attach({ renderer, physics, input, sceneManager });

  setupEditor(engine, sceneManager);

  try {
    await sceneManager.loadDefaultScene();
    console.log("%c[NebulaForge] Scene loaded successfully.", "color: #22c55e;");
  } catch(err) {
    console.error("[NebulaForge] Failed to load default scene:", err);
  }

  engine.start();

  window.addEventListener("resize", () => renderer.resize(window.innerWidth, window.innerHeight));
  document.addEventListener("keydown", e => {
    if(e.ctrlKey && e.key.toLowerCase() === "s") {
      e.preventDefault();
      sceneManager.quickSave();
    }
  });

  console.log("%c[NebulaForge] Engine Running. Build v0.2", "color:#3b82f6;");
})();
