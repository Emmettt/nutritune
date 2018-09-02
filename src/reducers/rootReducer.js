const initialState = {
  foodDB: {},
  menu: {},
  chartData: {
    labels: [],
    dataSetP: [],
    dataSetF: [],
    dataSetC: []
  },
  showUI: {
    typeUI: '',
    intakeID: '',
    intakeName: '',
    dishID: '',
    qty: 0,
    rest: 0,
    clientX: 0,
    clientY: 0,
    offsetX: 0,
    offsetY: 0
  },
  dayNorms: {
    weight: 70,
    proteins: 3,
    fats: 1,
    carb: 5,
    caloricity: 42
  }
};

export default function rootReducer(state = initialState, action) {
  const resetUI = {
    typeUI: '',
    intakeID: '',
    intakeName: '',
    dishID: '',
    qty: 0,
    rest: 0,
    clientX: 0,
    clientY: 0,
    offsetX: 0,
    offsetY: 0
  };
  switch (action.type) {
    case 'GET_INITIAL_DATA': {
      return {
        ...state,
        foodDB: action.foodDB,
        menu: action.menu,
        showUI: {
          ...resetUI,
          typeUI: ''
        }
      };
    }
    case 'SHOW_UI': {
      const dialog = state.showUI;
      if (action.payload.typeUI) dialog.typeUI = action.payload.typeUI;
      if (action.payload.intakeID) dialog.intakeID = action.payload.intakeID;
      if (action.payload.intakeName)
        dialog.intakeName = action.payload.intakeName;
      if (action.payload.dishID) dialog.dishID = action.payload.dishID;
      if (action.payload.qty) dialog.qty = Number(action.payload.qty);
      if (action.payload.rest) dialog.rest = action.payload.rest;
      if (action.payload.event) {
        dialog.clientX = action.payload.event.clientX;
        dialog.clientY = action.payload.event.clientY;
        dialog.offsetX = action.payload.event.nativeEvent.offsetX;
        dialog.offsetY = action.payload.event.nativeEvent.offsetY;
      }
      return {
        ...state,
        showUI: { ...dialog }
      };
    }

    case 'HIDE_UI':
      return {
        ...state,
        showUI: resetUI
      };

    case 'SET_SHOWMODAL_TO_LOADER':
      return {
        ...state,
        showUI: {
          ...resetUI,
          typeUI: 'loader'
        }
      };

    case 'FILL_CHART_DATA': {
      const id = action.id;
      const data = action.data;
      const name = state.menu[id].name;
      const position = state.menu[id].order;
      const chrtDta = state.chartData;
      chrtDta.labels[position] = name;
      chrtDta.dataSetP[position] = data[0];
      chrtDta.dataSetF[position] = data[1];
      chrtDta.dataSetC[position] = data[2];

      return {
        ...state,
        chartData: { ...chrtDta }
      };
    }

    case 'INPUT_RANGE':
      const menu = state.menu;
      menu[state.showUI.intakeID].dishes[state.showUI.dishID].qty =
        action.payload;
      menu[state.showUI.intakeID].dishes = {
        ...menu[state.showUI.intakeID].dishes
      };
      return {
        ...state,
        menu: menu
      };

    case 'ADD_NEW_PRODUCT': {
      const foodDB = {
        ...state.foodDB
      };
      foodDB[action.name] = action.newProduct;
      const showUI = {
        ...state.showUI,
        typeUI: 'adddish'
      };
      return {
        ...state,
        foodDB: foodDB,
        showUI: showUI
      };
    }

    case 'ADD_PARAMETERS': {
      const dayNorms = {
        ...action.parameters
      };
      return {
        ...state,
        dayNorms: dayNorms,
        showUI: resetUI
      };
    }

    case 'ON_CHANGE_INPUT': {
      const value = action.payload;
      const showEl = { ...state.showUI };
      showEl.intakeName = value;
      return {
        ...state,
        showUI: showEl
      };
    }

    case 'REMOVE_DISH_MENU': {
      let newMenu;
      const intake_active = action.payload.intakeID;
      newMenu = { ...state.menu };
      delete newMenu[intake_active].dishes[action.payload.dishID];
      newMenu[intake_active].dishes = { ...newMenu[intake_active].dishes };
      return {
        ...state,
        menu: newMenu,
        showUI: resetUI
      };
    }

    case 'ADD_CHANGE_DISH_ACTION': {
      let dishID;
      if (state.showUI.typeUI === 'adddish') {
        dishID = getId();
      }
      if (state.showUI.typeUI === 'changedish') {
        dishID = state.showUI.dishID;
      }
      const new_menu = { ...state.menu };
      const intake = state.showUI.intakeID;
      new_menu[intake].dishes[dishID] = {
        name: action.payload,
        qty: 60
      };
      new_menu[intake].dishes = { ...new_menu[intake].dishes };
      return {
        ...state,
        menu: new_menu,
        showUI: resetUI
      };
    }

    case 'ADD_INTAKE_ACTION': {
      let newMenu = { ...state.menu };
      const currentIntake = state.showUI.intakeID;
      const newName = state.showUI.intakeName;
      const currentOrder = state.menu[currentIntake].order;
      const shift = 1;
      newMenu = changeOrder(newMenu, currentOrder, shift);
      const intakeID = getId();
      const newDishID = getId();

      newMenu[intakeID] = {
        name: newName,
        order: currentOrder,
        dishes: { [newDishID]: { name: 'Криптонит', qty: 100 } }
      };
      return {
        ...state,
        menu: newMenu,
        chartData: {
          labels: [],
          dataSetP: [],
          dataSetF: [],
          dataSetC: []
        },
        showUI: { ...resetUI }
      };
    }

    case 'RENAME_INTAKE_ACTION': {
      let newMenu = { ...state.menu };
      const currentIntake = state.showUI.intakeID;
      const newName = state.showUI.intakeName;
      newMenu[currentIntake].name = newName;
      return {
        ...state,
        menu: newMenu,
        showUI: { ...resetUI }
      };
    }

    case 'REMOVE_INTAKE_MENU': {
      let newMenu = { ...state.menu };
      const currentIntake = state.showUI.intakeID;
      const currentOrder = state.menu[currentIntake].order;
      const shift = -1;
      delete newMenu[currentIntake];
      newMenu = changeOrder(newMenu, currentOrder, shift);
      return {
        ...state,
        menu: newMenu,
        chartData: {
          labels: [],
          dataSetP: [],
          dataSetF: [],
          dataSetC: []
        },
        showUI: { ...resetUI }
      };
    }
    default:
      return state;
  }
}

function getId() {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}

function changeOrder(newMenu, currentOrder, shift) {
  const keys = Object.keys(newMenu);
  keys.forEach(e => {
    if (newMenu[e].order >= currentOrder) newMenu[e].order += shift;
  });
  return newMenu;
}

/*     case 'SHOW_PARAMETERS_TAB': {
  const showUI = {
    ...state.showUI,
    type: 'paramtab'
  };
  return {
    ...state,
    showUI: showUI
  };
} */

/*     case 'SHOW_RANGE':
  return {
    ...state,
    showUI: {
      type: 'range',
      intake: action.payload.intake,
      dish: action.payload.id,
      qty: Number(action.payload.value),
      clientX: action.payload.event.clientX,
      clientY: action.payload.event.clientY,
      offsetX: action.payload.event.nativeEvent.offsetX,
      offsetY: action.payload.event.nativeEvent.offsetY
    }
  }; */

/*     case 'SHOW_INTAKE_MENU':
  const intake_menu = action.payload.id;
  const order = state.menu[intake_menu].order;
  const name = state.menu[intake_menu].name;

  return {
    ...state,
    showUI: {
      type: 'intakemenu',
      intake: intake_menu,
      order: order,
      name: name,
      qty: action.payload.leftQty,
      clientX: action.payload.event.clientX,
      clientY: action.payload.event.clientY,
      offsetX: action.payload.event.nativeEvent.offsetX,
      offsetY: action.payload.event.nativeEvent.offsetY
    }
  }; */
/*     case 'SHOW_DISH_MENU':
  return {
    ...state,
    showUI: {
      type: 'dishmenu',
      intake: action.payload.intake,
      dish: action.payload.id,
      qty: action.payload.left,
      clientX: action.payload.event.clientX,
      clientY: action.payload.event.clientY,
      offsetX: action.payload.event.nativeEvent.offsetX,
      offsetY: action.payload.event.nativeEvent.offsetY
    }
  }; */

/*     case 'SHOW_ADDINTAKE_MSG': {
  const showUI = {
    ...state.showUI,
    typeUI: 'intakename',
    intakeName: ''
  };
  return {
    ...state,
    showUI: showUI
  };
} */

/*     case 'SHOW_RENAMEINTAKE_MSG': {
  const showUI = {
    ...state.showUI,
    typeUI: 'intakerename',
    intakeName: ''
  };
  return {
    ...state,
    showUI: showUI
  };
} */
/*     case 'SHOW_ADD_PRODUCT': {
  //VVVVVVVVVVVVV
  const showUI = {
    ...state.showUI,
    typeUI: 'addproduct'
  };
  return {
    ...state,
    showUI: showUI
  };
} */
