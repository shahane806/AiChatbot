export const admin_side_menu_reducer = (state = { isOpen: true }, action) => {
    switch (action.type) {
      case "admin_side_menu": {
        return (state = { isOpen: !state.isOpen });
      }
      default: {
        return state;
      }
    }
  };
  