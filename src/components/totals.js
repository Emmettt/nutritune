import React from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';

import './totals.css';

function Totals(props) {
  const {
    proteins,
    fats,
    carb,
    caloricity,
    dayNormProteins,
    dayNormFats,
    dayNormCarb,
    dayNormCaloricity,
    per1kgProteins,
    per1kgFats,
    per1kgCarb,
    per1kgCaloricity,
    balanceProteins,
    balanceFats,
    balanceCarb
  } = props;
  return (
    <table className="footer">
      <tbody>
        <tr id="row1">
          <td className="totalsname">Итого за день</td>
          <td />
          <td>{proteins}</td>
          <td>{fats}</td>
          <td>{carb}</td>
          <td>{caloricity}</td>
        </tr>
        <tr id="row2">
          <td className="totalsname">Суточная норма, %</td>
          <td />
          <td>{dayNormProteins}</td>
          <td>{dayNormFats}</td>
          <td>{dayNormCarb}</td>
          <td>{dayNormCaloricity}</td>
        </tr>
        <tr id="row3">
          <td className="totalsname">На 1кг веса</td>
          <td />
          <td>{per1kgProteins}</td>
          <td>{per1kgFats}</td>
          <td>{per1kgCarb}</td>
          <td>{per1kgCaloricity}</td>
        </tr>
        <tr id="row4">
          <td className="totalsname">Баланс</td>
          <td />
          <td>{balanceProteins}</td>
          <td>{balanceFats}</td>
          <td>{balanceCarb}</td>
          <td />
        </tr>
      </tbody>
    </table>
  );
}

function totalsSelector(state) {
  let proteins = 0;
  let fats = 0;
  let carb = 0;
  let caloricity = 0;
  let dayNormProteins = 0;
  let dayNormFats = 0;
  let dayNormCarb = 0;
  let dayNormCaloricity = 0;
  let per1kgProteins = 0;
  let per1kgFats = 0;
  let per1kgCarb = 0;
  let per1kgCaloricity = 0;
  let balanceProteins = 0;
  let balanceFats = 0;
  let balanceCarb = 0;

  _.map(state.menu, value => {
    _.map(value.dishes, value => {
      proteins += Math.round(
        (value.qty * state.foodDB[value.name].proteins) / 100
      );
      fats += Math.round((value.qty * state.foodDB[value.name].fats) / 100);
      carb += Math.round(
        (value.qty * state.foodDB[value.name].carbohydrates) / 100
      );
      caloricity += Math.round(
        (value.qty * state.foodDB[value.name].caloricity) / 100
      );
    });
  });

  dayNormProteins =
    Math.round(
      (proteins / (state.dayNorms.weight * state.dayNorms.proteins)) * 100
    ) + '%';
  dayNormFats =
    Math.round((fats / (state.dayNorms.weight * state.dayNorms.fats)) * 100) +
    '%';
  dayNormCarb =
    Math.round((carb / (state.dayNorms.weight * state.dayNorms.carb)) * 100) +
    '%';
  dayNormCaloricity =
    Math.round(
      (caloricity / (state.dayNorms.weight * state.dayNorms.caloricity)) * 100
    ) + '%';

  per1kgProteins = (proteins / state.dayNorms.weight).toFixed(1);
  per1kgFats = (fats / state.dayNorms.weight).toFixed(1);
  per1kgCarb = (carb / state.dayNorms.weight).toFixed(1);
  per1kgCaloricity = (caloricity / state.dayNorms.weight).toFixed(1);

  let sum = proteins + fats + carb;
  let p = Math.round((proteins / sum) * 100);
  balanceProteins = (p || 0) + '%';
  let f = Math.round((fats / sum) * 100);
  balanceFats = (f || 0) + '%';
  balanceCarb = (100 - p - f || 0) + '%';

  return {
    proteins: proteins,
    fats: fats,
    carb: carb,
    caloricity: caloricity,
    dayNormProteins: dayNormProteins,
    dayNormFats: dayNormFats,
    dayNormCarb: dayNormCarb,
    dayNormCaloricity: dayNormCaloricity,
    per1kgProteins: per1kgProteins,
    per1kgFats: per1kgFats,
    per1kgCarb: per1kgCarb,
    per1kgCaloricity: per1kgCaloricity,
    balanceProteins: balanceProteins,
    balanceFats: balanceFats,
    balanceCarb: balanceCarb
  };
}

function mapStateToProps(state) {
  return {
    ...totalsSelector(state)
  };
}

export default connect(mapStateToProps)(Totals);
