import React from 'react';
import { connect } from 'react-redux';

import Intake from './intake';

import './menu-table.css';

function Menu(props) {
  const { intakes } = props;
  const orderedMenu = [];
  Object.keys(intakes).map(
    intake => (orderedMenu[intakes[intake].order] = intake)
  );
  const leftQty = orderedMenu.length;
  return (
    <table className="menu">
      {orderedMenu.map(intk => {
        const name = intakes[intk].name;
        return <Intake key={intk} id={intk} name={name} leftQty={leftQty} />;
      })}
    </table>
  );
}

export default connect(state => {
  return {
    intakes: state.menu
  };
})(Menu);
