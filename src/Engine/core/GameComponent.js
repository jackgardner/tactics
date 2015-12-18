import { mixin } from 'core-decorators';
import * as registerComponent from '../decorators/registerComponent';

@mixin(registerComponent)
class GameComponent {

  initialise(callback) {

  }

  update() {
    // Intended to be overridden
  }

  render() {
    // Intended to be overridden
  }
}

export { GameComponent };
