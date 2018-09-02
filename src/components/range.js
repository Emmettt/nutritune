import React from 'react';
import { connect } from 'react-redux';

import inputRng from '../actions/input-range';
import hideUI from '../actions/hideUI';
import { Throttle } from 'react-throttle';

import './range.css';

function Range(props) {
  const { qty, clientX, clientY, offsetX, offsetY, hideUI, oninput } = props;
  const top = clientY - offsetY + 21 + 'px';
  const left = clientX - offsetX - 2 + 'px';
  const rngStyle = {
    top: top,
    left: left
  };
  return (
    <div className="TEMPLATES relWrapper">
      <Throttle time="100" handler="onInput">
        <input
          className="rng"
          type="range"
          min="30"
          max="300"
          step="10"
          defaultValue={qty}
          onMouseLeave={hideUI}
          onInput={e => oninput(e.nativeEvent.target.value)}
          style={rngStyle}
        />
      </Throttle>
    </div>
  );
}

export default connect(
  state => ({
    ...state.showUI
  }),
  dispatch => ({
    hideUI: () => dispatch(hideUI()),
    oninput: value => dispatch(inputRng(value))
  })
)(Range);
