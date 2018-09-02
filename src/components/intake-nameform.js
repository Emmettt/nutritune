import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/intake-nameform';

import './intake-nameform.css';

class IntakeNameForm extends Component {
  submit = () => {
    const { typeUI, addIntakeAction, renameIntakeAction } = this.props;
    if (typeUI === 'intakename') addIntakeAction();
    if (typeUI === 'intakerename') renameIntakeAction();
  };

  render() {
    const {
      value,
      hideUI,
      onChangeInput,
      clientX,
      clientY,
      offsetX,
      offsetY
    } = this.props;
    const top = clientY - offsetY - 30 + 'px';
    const left = clientX - offsetX + 100 + 'px';
    const nameFormStyle = {
      top: top,
      left: left
    };
    return (
      <div className="dishMenuBackdrop" onClick={hideUI}>
        <div
          className="nameForm"
          style={nameFormStyle}
          onClick={e => e.stopPropagation()}
        >
          <input
            className="nameFormInput"
            type="text"
            placeholder="Название ..."
            value={value}
            onChange={e => onChangeInput(e.target.value)}
            onKeyUp={e => {
              if (e.key === 'Enter') this.submit();
            }}
          />
          <button className="nameFormBtn" onClick={this.submit}>
            OK
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ ...state.showUI }),
  dispatch => bindActionCreators(actions, dispatch)
)(IntakeNameForm);
