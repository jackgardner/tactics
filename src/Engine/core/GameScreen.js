import { mixin } from 'core-decorators';
import * as registerComponent from '../decorators/registerComponent';
import three from 'three';

@mixin(registerComponent)
class GameScreen {
  constructor() {
    this.scene = new three.Scene();
  }
  render(renderer) {
    if (!renderer) {
      throw new Error('GameScreen with no renderer');
    }
    if (!this.camera) {
      throw new Error('GameScreen with no camera');
    }
    renderer.render(this.scene, this.camera);
  }

  update() {
    for (let i = 0; i < this.components.length; ++i) {
      this.components[i].update.apply(this.components[i]);
    }
  }
}


export { GameScreen };
