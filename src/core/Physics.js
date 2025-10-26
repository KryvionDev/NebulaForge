import * as CANNON from 'cannon-es';

export class Physics {
  constructor() {
    this.world = null;
    this.bodies = new Map();
  }

  init() {
    this.world = new CANNON.World();
    this.world.gravity.set(0, -9.82, 0);

    const ground = new CANNON.Body({ mass: 0, shape: new CANNON.Plane() });
    ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    this.world.addBody(ground);
  }

  addBox(size = [1, 1, 1], pos = [0, 0, 0], mass = 1) {
    const shape = new CANNON.Box(new CANNON.Vec3(size[0]/2, size[1]/2, size[2]/2));
    const body = new CANNON.Body({ mass, shape });
    body.position.set(...pos);
    this.world.addBody(body);
    return body;
  }

  step(dt = 1/60) {
    if (this.world) this.world.step(dt);
  }
}
