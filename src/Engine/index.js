import three from 'three';
import { mixin } from 'core-decorators';
import { registerComponent } from './decorators/registerComponent';

@mixin(registerComponent)
class Engine {
  /**
   * Construct a new Engine with options
   * @param domElement Element to attach renderer
   * @param renderOptions Height and width
   */
  constructor({ domElement, renderOptions }) {
    this.screens = [];
    this.scene = new three.Scene();
    this.camera = new three.PerspectiveCamera(75, renderOptions.width / renderOptions.height, 0.1, 1000);

    this.renderer = new three.WebGLRenderer();
    this.renderer.setSize(renderOptions.width, renderOptions.height);

    domElement.appendChild(this.renderer.domElement);
    this.run();
  }

  addScreen(screen) {
    this.screens.push(screen);
  }
  /**
   * Engine life cycle function
   */
  run() {
    // Engine entities are structured in a tree, so it should be enough to ask any top level components
    // to do their updates here
    for (let i = 0; i < this.components.length; ++i) {
      this.components[i].update.apply(this.components[i]);
    }

    // Request another run on the next animation frame
    requestAnimationFrame(this.run.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  onComponentRegistered(callback) {
    this.componentRegistrationCallback = callback;
  }
}

export default Engine;
