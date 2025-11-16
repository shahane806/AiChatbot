export const side_menu_reducer = (state = { isOpen: true }, action) => {
  switch (action.type) {
    case "side_menu": {
      return (state = { isOpen: !state.isOpen });
    }
    default: {
      return state;
    }
  }
};
