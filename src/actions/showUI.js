//type, intake, intakename, dish, qty, rest, event
export default function showUI(
  event,
  typeUI,
  intakeID,
  intakeName,
  dishID,
  qty,
  rest
) {
  return {
    type: 'SHOW_UI',
    payload: {
      event,
      typeUI,
      intakeID,
      intakeName,
      dishID,
      qty,
      rest
    }
  };
}
