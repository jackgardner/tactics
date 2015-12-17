/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component } from 'react';
import s from './Header.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import Navigation from '../Navigation';

@withStyles(s)
class Header extends Component {

  render() {
    return (
      <div className="ui fixed inverted menu">
        <div className="ui container">
          {/*  <Navigation className="ui large inverted secondary network menu" /> */}
          <div className="ui large inverted menu">
            <div className="header item" onClick={Link.handleClick}>
              <span>Thing</span>
            </div>
            <div className="item">
              Login
            </div>
            <div className="item">
              About
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Header;
