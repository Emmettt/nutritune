import React from 'react';
import { connect } from 'react-redux';

import Subtotals from '../components/subtotals';
import Dish from '../components/dish-row';
import _ from 'lodash';

import './intake.css';

function Intake(props) {
  const { id, name, menu, leftQty } = props;
  const dishes = menu[id].dishes;
  return (
    <tbody>
      <Subtotals id={id} name={name} leftQty={leftQty} />
      {_.map(dishes, (value, key) => (
        <Dish
          key={key}
          intake={id}
          id={key}
          name={value.name}
          left={Object.keys(dishes).length}
        />
      ))}
    </tbody>
  );
}

export default connect((state, props) => ({
  menu: state.menu
}))(Intake);
