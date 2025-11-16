export const auth_reducer = (state = null, action) => {
  switch (action.type) {
    case "signIn": {
      return (state = action.payload);
    }
    case "login": {
      return (state = action.payload);
    }
    case "signOut":{
        return (state = null);
    }
    default: {
      return state;
    }
  }
};
