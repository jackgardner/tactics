import three from 'three';
import { GameComponent } from './core/GameComponent';
import { arrayNotificationHandler } from './core/utils';
export default class Engine {

  /**
   * Construct a new Engine with options
   * @param domElement Element to attach renderer
   * @param renderOptions Height and width
   */
  constructor ({ domElement, renderOptions }) {

    this.components = new Proxy([], arrayNotificationHandler);

    this.scene = new three.Scene();
    this.camera = new three.PerspectiveCamera( 75, renderOptions.width / renderOptions.height, 0.1, 1000 );

    this.renderer = new three.WebGLRenderer();
    this.renderer.setSize( renderOptions.width, renderOptions.height  );

    domElement.appendChild( this.renderer.domElement );
    this.run();
  }

  /**
   * Register a new top-level game component for logic updates
   * @param component GameComponent to register
   */
  registerComponent( component ) {
    if(!(component instanceof GameComponent)) {
      throw Error('registerComponent called with an invalid component. Must be of type GameComponent');
    }

    component.attachEngine(this);

    this.components.push(component);
    if(this.componentRegistrationCallback) {
      this.componentRegistrationCallback({ components: this.components.length });
    }
  }

  /**
   * Engine life cycle function
   */
  run() {
    // Engine entities are structured in a tree, so it should be enough to ask any top level components
    // to do their updates here
    for(let i = 0; i < this.components.length; ++i) {
      this.components[i].render.apply(this.components[i]);
    }

    // Request another run on the next animation frame
    requestAnimationFrame( this.run.bind(this) );
    this.renderer.render( this.scene, this.camera );
  }

  onComponentRegistered(callback) {
    this.componentRegistrationCallback = callback;
  }

};
