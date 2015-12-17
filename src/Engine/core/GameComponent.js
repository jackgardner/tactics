import { mixin } from 'core-decorators';
import { registerComponent } from '../decorators/registerComponent';

@mixin(registerComponent)
class GameComponent {

  /**
   * Not intended for public use. Calling registerComponent will take care of any attachment
   * @param engine
   */
  attachEngine(engine) {
    this.engine = engine;
  }

  update() {
    // Intended to be overridden
  }

  render() {
    // Intended to be overridden
  }
}

export { GameComponent };
