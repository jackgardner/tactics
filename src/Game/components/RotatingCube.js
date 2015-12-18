import { GameComponent } from '../../Engine/core/GameComponent';
import three from 'three';

export class RotatingCube extends GameComponent {
  constructor(position, colour) {
    super();

    this.position = position;
    this.colour = colour;

    this.update = this.update.bind(this);
    this.initialise = this.initialise.bind(this);
  }
  initialise(callback) {
    super.initialise(callback);

    const geometry = new three.BoxGeometry(1, 1, 1);
    const material = new three.MeshBasicMaterial({ color: this.colour });
    const cube = new three.Mesh(geometry, material);

    cube.position.copy(this.position);
    this.mesh = cube;

    if(typeof callback === 'function') {
      callback(this.mesh);
    }
  }

  update() {
    super.update();

    if (this.mesh) {
      this.mesh.rotation.x += 0.01;
    }
  }
}
