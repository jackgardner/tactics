/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component } from 'react';
import s from './Game.scss';
import Engine from '../../Engine'; // Move to NPM module?
import { GameComponent } from '../../Engine/core/GameComponent';
import { GameScreen } from '../../Engine/core/GameScreen';
import { Chance } from 'chance';

import withStyles from '../../decorators/withStyles';
import three from 'three';

const chance = new Chance();

class RotatingCube extends GameComponent {
  constructor(position, colour) {
    super();

    this.position = position;
    this.colour = colour;

    this.update = this.update.bind(this);
    this.initialise = this.initialise.bind(this);
  }
  initialise(callback) {
    super.initialise(callback);

    const geometry = new three.BoxGeometry(1, 1, 1);
    const material = new three.MeshBasicMaterial({ color: this.colour });
    const cube = new three.Mesh(geometry, material);

    cube.position.copy(this.position);
    this.mesh = cube;

    if(typeof callback === 'function') {
      callback(this.mesh);
    }
  }

  update() {
    super.update();

    if (this.mesh) {
      this.mesh.rotation.x += 0.01;
    }
  }
}

class TestScreen extends GameScreen {
  constructor({ width, height }) {
    super();
    this.camera = new three.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.initialise = this.initialise.bind(this);
    this.generateBox = this.generateBox.bind(this);

    this.camera.position.z = 5;
    this.generateBox({
      x: chance.integer({min: -2, max: 2}),
      y: chance.integer({min: -2, max: 2}),
      z: chance.integer({min: -2, max: 2})
    }, 0x00ff00);
    this.generateBox({
      x: chance.integer({ min: -2, max: 2 }),
      y: chance.integer({ min: -2, max: 2 }),
      z: chance.integer({ min: -2, max: 2 })
    }, 0xff0000);
  }

  initialise() {
  }
  generateBox(position, color) {
    const cube = new RotatingCube(position, color);
    this.registerComponent(cube);
  }
  render(renderer) {
    super.render(renderer);
  }
}


@withStyles(s)
class Game extends Component {
  constructor() {
    super();
    this.state = { numOfComponents: 0 };
    this.updateDebugInfo = this.updateDebugInfo.bind(this);
  }
  componentDidMount() {
    const engine = new Engine({
      domElement: document.getElementById('root'),
      renderOptions: {
        height: 480,
        width: 640,
      },
    });
    engine.onComponentRegistered(this.updateDebugInfo);
    engine.addScreen(new TestScreen(engine.renderOptions));
    engine.addScreen(new TestScreen(engine.renderOptions));
  }

  updateDebugInfo(message) {
    this.setState({ numOfComponents: message.components });
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
