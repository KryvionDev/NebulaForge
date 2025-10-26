// ===============================================
// 🌌 NebulaForge Engine - Core Bootstrap
// ===============================================

import { Engine } from "./core/engine.js";
import { Renderer } from "./core/renderer.js";
import { Physics } from "./core/physics.js";
import { Input } from "./core/input.js";
import { SceneManager } from "./scenes/sceneManager.js";
import { setupEditor } from "./ui/editor.js";
import { UserAuth } from "./user/auth.js";

// ===============================================
// 🔧 Inicialização da Aplicação
// ===============================================

(async function initializeNebulaForge() {
  console.log("%c[NebulaForge] Booting Engine...", "color:#3b82f6;font-weight:bold;");

  // Verifica login antes de abrir a engine
  const user = await UserAuth.verifySession();
  if (!user) {
    window.location.href = "/public/dashboard.html";
    return;
  }

  // Canvas de renderização
  let canvas = document.getElementById("editorCanvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "editorCanvas";
    document.body.appendChild(canvas);
  }

  // ===============================================
  // ⚙️ Núcleo da Engine
  // ===============================================

  const engine = new Engine(canvas);
  const renderer = new Renderer(canvas);
  const physics = new Physics();
  const input = new Input(canvas);
  const sceneManager = new SceneManager(engine, renderer, physics);

  // Injetar dependências (injeção simples)
  engine.attach({ renderer, physics, input, sceneManager });

  // ===============================================
  // 🧩 Interface do Editor
  // ===============================================
  setupEditor(engine, sceneManager);

  // ===============================================
  // 🌍 Carregamento Inicial
  // ===============================================

  try {
    await sceneManager.loadDefaultScene();
    console.log("%c[NebulaForge] Scene loaded successfully.", "color: #22c55e;");
  } catch (err) {
    console.error("[NebulaForge] Failed to load default scene:", err);
  }

  // ===============================================
  // ▶️ Loop Principal
  // ===============================================
  engine.start();

  // ===============================================
  // 🧠 Eventos e Hot Reload
  // ===============================================

  window.addEventListener("resize", () => {
    renderer.resize(window.innerWidth, window.innerHeight);
  });

  // Salvamento rápido (CTRL+S)
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === "s") {
      e.preventDefault();
      sceneManager.quickSave();
    }
  });

  console.log("%c[NebulaForge] Engine Running. Build v0.2", "color:#3b82f6;");
})();
