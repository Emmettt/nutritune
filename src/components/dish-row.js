import React from 'react';
import { connect } from 'react-redux';

import makeMapStateToProps from '../selectors/dishes';
import showUI from '../actions/showUI';

import './dish-row.css';

function Dish(props) {
  const {
    showUI,
    name,
    id,
    intake,
    left,
    qty,
    proteins,
    fats,
    carb,
    caloricity
  } = props; //props.showUI(e, 'intakemenu', id, name, '', 0, leftQty)
  return (
    <tr className="dish">
      <td
        className="dishname"
        onClick={e => showUI(e, 'dishmenu', intake, '', id, 0, left)}
        onContextMenu={e => showUI(e, 'dishmenu', intake, '', id, 0, left)}
      >
        {name}
      </td>
      <td
        className="editable"
        onClick={e => showUI(e, 'range', intake, '', id, qty, left)}
        onContextMenu={e => showUI(e, 'range', intake, '', id, qty, left)}
      >
        {qty}
      </td>
      <td>{proteins}</td>
      <td>{fats}</td>
      <td>{carb}</td>
      <td>{caloricity}</td>
    </tr>
  );
}

export default connect(
  makeMapStateToProps,
  dispatch => ({
    showUI: (e, typeUI, intakeID, intakeName, dishID, qty, rest) =>
      dispatch(showUI(e, typeUI, intakeID, intakeName, dishID, qty, rest))
    /* showRange: (e, id, intake, qty) => dispatch(showRange(e, id, intake, qty)),
    showMenu: (e, id, intake, left) =>
      dispatch(showDishMenu(e, id, intake, left)) */
  })
)(Dish);
