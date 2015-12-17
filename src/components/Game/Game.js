/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component, PropTypes } from 'react';
import s from './Game.scss';
import Engine from '../../Engine'; // Move to NPM module?
import { GameComponent } from '../../Engine/core/GameComponent';

import withStyles from '../../decorators/withStyles';
import three from 'three';

class TestScreen extends GameComponent {
  constructor() {
    super();

    this.generateBox = this.generateBox.bind(this);
    this.initialise = this.initialise.bind(this);
    this.update =  this.update.bind(this);
  }

  initialise() {
    this.generateBox({x:0, y:0, z:0},0x00ff00);
    this.cube = this.generateBox({x:2, y:2, z:1}, 0xff0000);
    this.engine.camera.position.z = 5;
  }
  generateBox(position, color) {
    const geometry = new three.BoxGeometry(1,1,1);
    const material = new three.MeshBasicMaterial({ color });
    const cube = new three.Mesh( geometry, material );

    cube.position.copy(position);
    this.engine.scene.add(cube);

    return cube;
  }
  update() {
    super.update();

    this.cube.rotation.x += 0.01;

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
    engine.registerComponent(new TestScreen());
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
