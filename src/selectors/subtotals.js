import { createSelector } from 'reselect';
import _ from 'lodash';

function getIntakeDishes(state, props) {
  return state.menu[props.id].dishes;
}

function getFoodData(state) {
  return state.foodDB;
}

function makeCalcIntakeTotals() {
  return createSelector([getIntakeDishes, getFoodData], (dishes, foodDB) => {
    let proteins = 0;
    let fats = 0;
    let carb = 0;
    let caloricity = 0;
    _.map(dishes, value => {
      proteins += Math.round((value.qty * foodDB[value.name].proteins) / 100);
      fats += Math.round((value.qty * foodDB[value.name].fats) / 100);
      carb += Math.round((value.qty * foodDB[value.name].carbohydrates) / 100);
      caloricity += Math.round(
        (value.qty * foodDB[value.name].caloricity) / 100
      );
    });
    return {
      proteins: proteins,
      fats: fats,
      carb: carb,
      caloricity: caloricity
    };
  });
}

function makeMapStateToProps(state, props) {
  const calcIntakeTotals = makeCalcIntakeTotals(state, props);
  const mapStateToProps = (state, props) => {
    return calcIntakeTotals(state, props);
  };
  return mapStateToProps;
}

export default makeMapStateToProps;
