import React from 'react';
import { connect } from 'react-redux';

import showUI from '../actions/showUI';
import hideUI from '../actions/hideUI';
import removeIntake from '../actions/remove-intake';

import './intakemenu-context.css';

function IntakeMenu(props) {
  const {
    hideUI,
    removeIntake,
    intakeName,
    rest,
    clientX,
    clientY,
    offsetX,
    offsetY
  } = props;
  const top = clientY - offsetY - 30 + 'px';
  const left = clientX - offsetX + 100 + 'px';
  const intakeMenuStyle = {
    top: top,
    left: left
  };
  return (
    <div className="dishMenuBackdrop" onClick={hideUI}>
      <div className="chooseFoodIntakeMenu" style={intakeMenuStyle}>
        <div
          className="addFoodIntake"
          onClick={e => {
            e.stopPropagation();
            props.showUI('', 'intakename', '', '', '', 0, 0);
          }}
        >
          Добавить прием пищи
        </div>
        {rest > 1 && (
          <div
            className="removeFoodIntake"
            onClick={e => {
              e.stopPropagation();
              removeIntake();
            }}
          >
            Удалить "{intakeName}"
          </div>
        )}
        <div
          className="addFoodIntake"
          onClick={e => {
            e.stopPropagation();
            props.showUI('', 'intakerename', '', '', '', 0, 0);
          }}
        >
          Переименовать прием пищи
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.showUI
  };
}

export default connect(
  mapStateToProps,
  dispatch => ({
    showUI: (e, typeUI, intakeID, intakeName, dishID, qty, rest) =>
      dispatch(showUI(e, typeUI, intakeID, intakeName, dishID, qty, rest)),
    hideUI: () => {
      dispatch(hideUI());
    },
    removeIntake: () => {
      dispatch(removeIntake());
    }
  })
)(IntakeMenu);
