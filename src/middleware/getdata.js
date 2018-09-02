import { foodDB, menu } from '../db/db';

export default function getInitialData(dispatch) {
  dispatch({ type: 'SET_SHOWMODAL_TO_LOADER' });
  return dispatch => {
    setTimeout(() => {
      dispatch({ type: 'GET_INITIAL_DATA', foodDB, menu });
    }, 500);
  };
}
