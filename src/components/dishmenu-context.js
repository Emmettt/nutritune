import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import showUI from '../actions/showUI';
import hideUI from '../actions/hideUI';
import removeDish from '../actions/remove-dish';

import './dishmenu-context.css';

function DishMenu(props) {
  const {
    showUI,
    hideUI,
    removeDish,
    name,
    intakeID,
    dishID,
    rest,
    clientX,
    clientY,
    offsetX,
    offsetY
  } = props;
  const top = clientY - offsetY - 30 + 'px';
  const left = clientX - offsetX + 100 + 'px';
  const dishMenuStyle = {
    top: top,
    left: left
  };
  return (
    <div className="dishMenuBackdrop" onClick={hideUI}>
      <div className="chooseDishMenu" style={dishMenuStyle}>
        <div
          className="chooseDish"
          onClick={e => {
            e.stopPropagation();
            showUI('', 'changedish', '', '', '', 0, '');
          }}
        >
          Заменить "{name}"
        </div>
        <div
          className="addDish"
          onClick={e => {
            e.stopPropagation();
            showUI('', 'adddish', '', '', '', 0, '');
          }}
        >
          Добавить продукт
        </div>
        {rest > 1 && (
          <div
            className="removeDish"
            onClick={e => {
              e.stopPropagation();
              removeDish(intakeID, dishID);
            }}
          >
            Удалить "{name}"
          </div>
        )}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const intake = state.showUI.intakeID;
  const dish = state.showUI.dishID;
  return {
    ...state.showUI,
    name: state.menu[intake].dishes[dish].name
  };
}

export default connect(
  mapStateToProps,
  dispatch => bindActionCreators({ removeDish, showUI, hideUI }, dispatch)
)(DishMenu);
