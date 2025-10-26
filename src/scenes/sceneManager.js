export class SceneManager {
  constructor(engine) {
    this.engine = engine;
    this.currentScene = { nodes: [] }; // Mantém a cena em memória
  }

  // Exporta a cena atual para JSON
  export() {
    return JSON.stringify(this.currentScene, null, 2);
  }

  // Importa cena JSON
  import(json) {
    const data = typeof json === "string" ? JSON.parse(json) : json;
    this.currentScene = data;
    this.clearScene();

    data.nodes.forEach(node => {
      switch(node.type) {
        case "box":
          this.engine.createBox(node.size || [1,1,1], node.position, node.material);
          break;
        case "sphere":
          this.engine.createSphere(node.radius || 1, node.position, node.material);
          break;
        // Adicione mais tipos de objetos conforme a engine evolui
        default:
          console.warn(`Node type unknown: ${node.type}`);
      }
    });
  }

  // Limpa a cena atual
  clearScene() {
    this.engine.clearAllObjects();
  }

  // Adiciona um node sem recarregar a cena inteira
  addNode(node) {
    this.currentScene.nodes.push(node);
    switch(node.type) {
      case "box":
        this.engine.createBox(node.size || [1,1,1], node.position, node.material);
        break;
      case "sphere":
        this.engine.createSphere(node.radius || 1, node.position, node.material);
        break;
      default:
        console.warn(`Node type unknown: ${node.type}`);
    }
  }
}
