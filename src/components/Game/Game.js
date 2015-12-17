/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component, PropTypes } from 'react';
import s from './Game.scss';
import Engine from '../../Engine'; // Move to NPM module?
import { GameComponent } from '../../Engine/core/GameComponent';

import withStyles from '../../decorators/withStyles';
import three from 'three';

class TestComponent extends GameComponent {
  render() {
    super.render();

    const geometry = new three.BoxGeometry(1,1,1);
    const material = new three.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new three.Mesh( geometry, material );

    this.engine.scene.add(cube);
    this.engine.camera.position.z = 5;
  }
}


@withStyles(s)
class Game extends Component {
  constructor() {
    super();
    this.state = { numOfComponents: 0 };
    this.updateDebugInfo = this.updateDebugInfo.bind(this);
  }

  updateDebugInfo(message) {
    this.setState({ numOfComponents: message.components });
  }
  componentDidMount() {

    const engine = new Engine({
      domElement: document.getElementById('root'),
      renderOptions: {
        height: 480,
        width: 640
      }
    });
    engine.onComponentRegistered(this.updateDebugInfo);
    engine.registerComponent(new TestComponent());
  }


  render() {
    return (
      <div>

        <div id="root">
        </div>
        <div>
          {this.state.numOfComponents}
        </div>
      </div>
    );
  }

}

export default Game;
