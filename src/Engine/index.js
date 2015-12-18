import three from 'three';
import { GameScreen } from './core/GameScreen';

class Engine {
  /**
   * Construct a new Engine with options
   * @param domElement Element to attach renderer
   * @param renderOptions Height and width
   */
  constructor({ domElement, renderOptions }) {
    this.screens = [];
    this.renderOptions = renderOptions;

    // TODO Surely camera and scene should be controlled by the screen, not the engine?


    this.renderer = new three.WebGLRenderer();
    this.renderer.setSize(renderOptions.width, renderOptions.height);

    domElement.appendChild(this.renderer.domElement);
    this.run();
  }

  addScreen(screen) {
    if(!(screen instanceof GameScreen)) { throw new Error('Type @screen must be of GameScreen'); }
    screen.engine = this;
    this.screens.push(screen);
  }
  /**
   * Engine life cycle function
   */
  run() {
    // Engine entities are structured in a tree, so it should be enough to ask any top level components
    // to do their updates here
    this.renderer.autoClear = false;

    // Request another run on the next animation frame
    requestAnimationFrame(this.run.bind(this));
    this.renderer.clear();
    for (let i = 0; i < this.screens.length; ++i) {
      this.screens[i].update.apply(this.screens[i]);
      this.renderer.clearDepth();
      this.screens[i].render.call(this.screens[i], this.renderer);
    }
  }

  onComponentRegistered(callback) {
    this.componentRegistrationCallback = callback;
  }
}

export default Engine;
