/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component } from 'react';
import s from './Game.scss';
import Engine from '../../Engine'; // Move to NPM module?
import { TestScreen } from '../../Game/debug/TestScreen';

import withStyles from '../../decorators/withStyles';
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
