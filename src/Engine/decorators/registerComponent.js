import { GameComponent } from '../core/GameComponent';
import { Chance } from 'chance';
import Engine from '../';

const chance = new Chance();


/**
 * Register a new top-level game component for logic updates
 * @param component GameComponent to register
 */
const registerComponent = {
  components: [],
  registerComponent(component) {
    if (!(component instanceof GameComponent)) {
      throw Error('registerComponent called with an invalid component. Must be of type GameComponent');
    }

    const engine = (this instanceof Engine) ? this : this.engine;

    component.attachEngine(engine);

    if (!component.id) {
      component.id = chance.hash({ length: 15 });
      console.log(`Added component with id ${component.id}`);
    }

    this.components.push(component);
    if (!this.registered) {
      component.registered = true;
      component.initialise();
    }
    if (this.componentRegistrationCallback) {
      this.componentRegistrationCallback({ components: this.components.length });
    }
  },
};

export { registerComponent };
