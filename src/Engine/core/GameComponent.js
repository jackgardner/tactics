export class GameComponent {

  constructor() {
    this.components = [];
  }

  /**
   * Not intended for public use. Calling registerComponent will take care of any attachment
   * @param engine
   */
  attachEngine(engine) {
    this.engine = engine;
  }

  registerComponent(component) {
    if(!this.engine) {
      throw Error('No ref to valid engine in registerComponent');
    }
    if(!(component instanceof GameComponent)) {
      throw Error('registerComponent called with an invalid component. Must be of type GameComponent');
    }
    this.components.push(component);
  }

  update() {
    // Intended to be overridden
    for(let i = 0; i<this.components.length; ++i) {
      this.components[i].update.apply(this.components[i], arguments.slice());
    }
  }

  render() {
    // Intended to be overridden
    for(let i = 0; i<this.components.length; ++i) {
      this.components[i].render.apply(this.components[i], arguments.slice());
    }
  }
};
