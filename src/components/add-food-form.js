import React, { Component } from 'react';
import { connect } from 'react-redux';
import hideUI from '../actions/hideUI';
import addFoodDB from '../actions/add-food-db';
import './add-food-form.css';

class AddFoodForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', proteins: '', fats: '', carb: '', caloricity: '' };
  }

  submit = () => {
    const name = this.state.name;
    const newProduct = {
      proteins: Number(this.state.proteins),
      fats: Number(this.state.fats),
      carbohydrates: Number(this.state.carb),
      caloricity: Number(this.state.caloricity)
    };
    this.props.addFood(name, newProduct);
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
      <div className="dishMenuBackdrop" onClick={this.props.hideUI}>
        <div className="addProductForm" onClick={e => e.stopPropagation()}>
          <input
            className="addProductInput"
            type="text"
            placeholder="Название продукта..."
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <input
            className="addProductInput"
            type="text"
            placeholder="Белки ..."
            value={this.state.proteins}
            onChange={e => this.onInput(e, 'proteins')}
          />
          <input
            className="addProductInput"
            type="text"
            placeholder="Жиры ..."
            value={this.state.fats}
            onChange={e => this.onInput(e, 'fats')}
          />
          <input
            className="addProductInput"
            type="text"
            placeholder="Углеводы ..."
            value={this.state.carb}
            onChange={e => this.onInput(e, 'carb')}
          />
          <input
            className="addProductInput"
            type="text"
            placeholder="Калорийность ..."
            value={this.state.caloricity}
            onChange={e => this.onInput(e, 'caloricity')}
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
  null,
  dispatch => ({
    addFood: (name, product) => dispatch(addFoodDB(name, product)),
    hideUI: () => dispatch(hideUI())
  })
)(AddFoodForm);
