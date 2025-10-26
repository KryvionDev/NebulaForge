export class SceneManager{
  constructor(engine){ this.engine=engine; }
  export(){ return this.engine.exportSceneJSON(); }
  import(json){ /* simples load box */ json.nodes.forEach(n=>this.engine.createBox([1,1,1],n.position)); }
}
