export const firebase_user_reducer = (state = null, action) => {
  switch (action.type) {
    case "firebase_user":
      {
        return (state = action.payload);
      }
    case "firebase_user_signout":
      {
        return (state = null);
      }
    default: {
      return state;
    }
  }
};
