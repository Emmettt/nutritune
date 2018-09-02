import React from 'react';
import { connect } from 'react-redux';

import fillChartData from '../actions/fillChartData';
import makeMapStateToProps from '../selectors/subtotals';
import showUI from '../actions/showUI';

import './subtotals.css';

class Subtotals extends React.Component {
  componentDidMount() {
    const { id, proteins, fats, carb, updateChartData } = this.props;
    updateChartData(id, [proteins, fats, carb]);
  }

  componentDidUpdate() {
    const { id, proteins, fats, carb, updateChartData } = this.props;
    updateChartData(id, [proteins, fats, carb]);
  }

  render() {
    const { name, id, proteins, fats, carb, caloricity, leftQty } = this.props;

    return (
      <tr className="foodintake">
        <td
          className="intakename"
          onClick={
            e => this.props.showUI(e, 'intakemenu', id, name, '', 0, leftQty)
            /* event,
            typeUI,
            intakeID,
            intakeName,
            dishID,
            qty,
            rest */
          }
        >
          {name}
        </td>
        <td />
        <td>{proteins}</td>
        <td>{fats}</td>
        <td>{carb}</td>
        <td>{caloricity}</td>
      </tr>
    );
  }
}

export default connect(
  makeMapStateToProps,
  dispatch => ({
    showUI: (e, typeUI, intakeID, intakeName, dishID, qty, rest) =>
      dispatch(showUI(e, typeUI, intakeID, intakeName, dishID, qty, rest)),
    updateChartData: (id, arrData) => dispatch(fillChartData(id, arrData))
  })
)(Subtotals);
