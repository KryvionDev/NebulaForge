import { Renderer } from './renderer.js';
import { Physics } from './physics.js';
import { AssetLoader } from './loader.js';

export class Engine {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new Renderer(canvas);
    this.physics = new Physics();
    this.entities = new Map();
    this.loop = this.loop.bind(this);
  }

  async init() {
    await this.renderer.init();
    this.physics.init();
    requestAnimationFrame(this.loop);
  }

  loop(dt) {
    this.physics.step(1/60);
    this.renderer.render();
    requestAnimationFrame(this.loop);
  }

  createBox(size = [1,1,1], pos = [0,0,0]) {
    const mesh = this.renderer.createBox(size);
    mesh.position.set(...pos);
    const body = this.physics.addBox(size, pos);
    const id = crypto.randomUUID();
    this.entities.set(id, { mesh, body });
    return { id };
  }

  attach({ renderer, physics, input, sceneManager }) {
    if(renderer) this.renderer = renderer;
    if(physics) this.physics = physics;
    this.input = input || null;
    this.sceneManager = sceneManager || null;
  }

  start() {
    this.init();
  }

  exportSceneJSON() {
    const nodes = [];
    for(const [id, e] of this.entities.entries()) {
      nodes.push({ id, type:'box', position:e.mesh.position.toArray() });
    }
    return { nodes };
  }
}
