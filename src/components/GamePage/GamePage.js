/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component, PropTypes } from 'react';
import s from './GamePage.scss';
import withStyles from '../../decorators/withStyles';

import Game from '../Game'

const title = 'Play';
@withStyles(s)
class GamePage extends Component {

  static propTypes = {
    path: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    title: PropTypes.string,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.context.onSetTitle(title);
  }
  render() {
    return (
      <div className={s.root}>
        <Game />
      </div>
    );
  }

}

export default GamePage;
