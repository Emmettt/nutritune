import React, { Component } from 'react';
import { connect } from 'react-redux';

import showUI from '../actions/showUI';
import hideUI from '../actions/hideUI';
import addParams from '../actions/add-params';

import './param-tab.css';

class ParametersTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: this.props.weight,
      proteins: this.props.proteins,
      fats: this.props.fats,
      carb: this.props.carb,
      caloricity: this.props.caloricity
    };
  }
  /* weight, proteins, fats, carb, caloricity */
  submit = () => {
    const parameters = {
      weight: Number(this.state.weight),
      proteins: Number(this.state.proteins),
      fats: Number(this.state.fats),
      carb: Number(this.state.carb),
      caloricity: Number(this.state.caloricity)
    };
    Object.keys(parameters).every(e => parameters[e] > 0)
      ? this.props.addParams(parameters)
      : this.props.showUI('', 'paramwarning', '', '', '', 0, 0);
  };

  checkUserInputValidity(val) {
    const isInRange = val >= 0;
    const isValidInput = val !== null;
    const isNaN = Number.isNaN(val);

    if (isValidInput && !isNaN && isInRange) {
      return true;
    }
    return false;
  }

  onInput(e, field) {
    return this.checkUserInputValidity(e.target.value)
      ? this.setState({ [field]: e.target.value })
      : '';
  }

  render() {
    return (
      <div className="dishMenuBackdrop" onClick={hideUI}>
        <div className="parametersTab" onClick={e => e.stopPropagation()}>
          <p className="promptParamTab">Ваш вес: </p>
          <input
            className="addParamInput"
            type="text"
            value={this.state.weight}
            onChange={e => this.onInput(e, 'weight')}
          />
          <hr />
          <p className="titleParamTab">Норма на 1 кг веса:</p>
          <div>
            <p className="promptParamTab">Белок: </p>
            <input
              className="addParamInput"
              type="text"
              value={this.state.proteins}
              onChange={e => this.onInput(e, 'proteins')}
            />
          </div>
          <div>
            <p className="promptParamTab">Жиры: </p>
            <input
              className="addParamInput"
              type="text"
              value={this.state.fats}
              onChange={e => this.onInput(e, 'fats')}
            />
          </div>
          <div>
            <p className="promptParamTab">Углеводы: </p>
            <input
              className="addParamInput"
              type="text"
              value={this.state.carb}
              onChange={e => this.onInput(e, 'carb')}
            />
          </div>
          <div>
            <p className="promptParamTab">ККал: </p>
            <input
              className="addParamInput"
              type="text"
              value={this.state.caloricity}
              onChange={e => this.onInput(e, 'caloricity')}
            />
          </div>
          <hr />
          <button className="paramTabBtn" onClick={this.submit}>
            OK
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ ...state.dayNorms }),
  dispatch => ({
    addParams: (parameters, validity) =>
      dispatch(addParams(parameters, validity)),
    showUI: (e, typeUI, intakeID, intakeName, dishID, qty, rest) =>
      dispatch(showUI(e, typeUI, intakeID, intakeName, dishID, qty, rest)),
    hideUI: () => dispatch(hideUI())
  })
)(ParametersTab);
