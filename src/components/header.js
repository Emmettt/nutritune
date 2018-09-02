import React, { Component } from 'react';
import { connect } from 'react-redux';

import showUI from '../actions/showUI';

import './header.css';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <p className="logo">
          <span className="nutri">N u t r i </span>
          <span className="tune">TUNE</span>
        </p>
        <ul className="nav">
          <li />
          <ul className="auth">
            <li>
              <a
                className="link parameters"
                href="#"
                onClick={() =>
                  this.props.showUI('', 'paramtab', '', '', '', 0, '')
                }
              >
                Мои параметры
              </a>
            </li>
            <li>
              <a className="link signin" href="#">
                Войти
              </a>
            </li>
            <li>
              <a className="link createacc" href="#">
                Создать аккаунт
              </a>
            </li>
          </ul>
        </ul>
      </div>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    showUI: (e, typeUI, intakeID, intakeName, dishID, qty, rest) =>
      dispatch(showUI(e, typeUI, intakeID, intakeName, dishID, qty, rest))
  })
)(Header);
