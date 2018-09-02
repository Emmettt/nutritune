export default function removeDish(intakeID, dishID) {
  return {
    type: 'REMOVE_DISH_MENU',
    payload: { intakeID, dishID }
  };
}
