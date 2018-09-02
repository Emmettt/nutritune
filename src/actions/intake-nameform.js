export function onChangeInput(value) {
  return {
    type: 'ON_CHANGE_INPUT',
    payload: value
  };
}

export function addIntakeAction() {
  return {
    type: 'ADD_INTAKE_ACTION',
    payload: null
  };
}

export function renameIntakeAction() {
  return {
    type: 'RENAME_INTAKE_ACTION',
    payload: null
  };
}
