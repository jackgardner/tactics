import { RotatingCube } from '../components/RotatingCube';
import { GameScreen } from '../../Engine/core/GameScreen';
import three from 'three';
import { Chance } from 'chance';

const chance = new Chance();

export class TestScreen extends GameScreen {
  constructor({ width, height }) {
    super();
    this.camera = new three.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.initialise = this.initialise.bind(this);
    this.generateBox = this.generateBox.bind(this);

    this.camera.position.z = 5;
    this.generateBox({
      x: chance.integer({min: -2, max: 2}),
      y: chance.integer({min: -2, max: 2}),
      z: chance.integer({min: -2, max: 2})
    }, 0x00ff00);
    this.generateBox({
      x: chance.integer({ min: -2, max: 2 }),
      y: chance.integer({ min: -2, max: 2 }),
      z: chance.integer({ min: -2, max: 2 })
    }, 0xff0000);
  }

  initialise() {
  }
  generateBox(position, color) {
    const cube = new RotatingCube(position, color);
    this.registerComponent(cube);
  }
  render(renderer) {
    super.render(renderer);
  }
}
