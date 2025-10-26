import * as THREE from 'three';

export default class Renderer {
  constructor(canvas){
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias:true });
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight,0.1,1000);
    this.scene.add(new THREE.AmbientLight(0x404040));
    const dir = new THREE.DirectionalLight(0xffffff,1);
    dir.position.set(3,10,5);
    this.scene.add(dir);
    const grid = new THREE.GridHelper(20,20);
    this.scene.add(grid);
    this.camera.position.set(0,3,6);
    this.camera.lookAt(0,0,0);
  }

  async init(){ /* pode adicionar resize, orbit controls etc */ }
  render(){ this.renderer.render(this.scene,this.camera); }
  createBox(size=[1,1,1]){
    const geo = new THREE.BoxGeometry(...size);
    const mat = new THREE.MeshStandardMaterial({ color:0x8888ff });
    const mesh = new THREE.Mesh(geo,mat);
    this.scene.add(mesh);
    return mesh;
  }
}
