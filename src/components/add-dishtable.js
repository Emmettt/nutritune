import React from 'react';
import { connect } from 'react-redux';
import DishRow from './add-dishrow';
import hideUI from '../actions/hideUI';
import addChangeDishAction from '../actions/addChangeDishAction';
import showUI from '../actions/showUI';
import AddFoodForm from './add-food-form';
import _ from 'lodash';
import './add-dishtable.css';

function DishTable(props) {
  const { hideUI, addChangeDish, showUI, typeUI } = props;
  return (
    <div className="dishMenuBackdrop" onClick={hideUI}>
      <div className="choosing">
        {typeUI === 'addproduct' && <AddFoodForm />}
        <div>
          <table className="DBTableHeader">
            <tbody className="chooseTable">
              <tr>
                <td className="dish_header">Блюдо</td>
                <td className="qty_header">Белки</td>
                <td className="qty_header">Жиры</td>
                <td className="qty_header">Углеводы</td>
                <td className="qty_header">ККал</td>
              </tr>
            </tbody>
          </table>
          <div className="overflow">
            <table className="DBTable">
              <tbody className="chooseTable">
                {_.map(props.foodDB, (value, key) => (
                  <DishRow
                    key={key}
                    name={key}
                    values={value}
                    addChangeDish={addChangeDish}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button
          className="addFoodButton"
          onClick={e => {
            e.stopPropagation();
            showUI('', 'addproduct', '', '', '', 0, '');
          }}
        >
          Добавить/изменить продукт ...
        </button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    foodDB: state.foodDB
  };
}

export default connect(
  mapStateToProps,
  dispatch => ({
    hideUI: () => dispatch(hideUI()),
    addChangeDish: dish => dispatch(addChangeDishAction(dish)),
    showUI: (e, typeUI, intakeID, intakeName, dishID, qty, rest) =>
      dispatch(showUI(e, typeUI, intakeID, intakeName, dishID, qty, rest))
  })
)(DishTable);
