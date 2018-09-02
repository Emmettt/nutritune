import { createSelector } from 'reselect';

function getDish(state, props) {
  return state.menu[props.intake].dishes;
}

function getFoodData(state, props) {
  return state.foodDB[props.name];
}

function makeCalcDishData(state, props) {
  return createSelector([getDish, getFoodData], (dish, foodData) => {
    const dishID = props.id;
    const intakeID = props.intake;
    dish = state.menu[intakeID].dishes[dishID];
    return {
      qty: dish.qty,
      proteins: Math.round((dish.qty * foodData.proteins) / 100),
      fats: Math.round((dish.qty * foodData.fats) / 100),
      carb: Math.round((dish.qty * foodData.carbohydrates) / 100),
      caloricity: Math.round((dish.qty * foodData.caloricity) / 100),
      rangeData: state.rangeData
    };
  });
}

function makeMapStateToProps(state, props) {
  const calcDishData = makeCalcDishData(state, props);
  const mapStateToProps = (state, props) => {
    return calcDishData(state, props);
  };
  return mapStateToProps;
}

export default makeMapStateToProps;
