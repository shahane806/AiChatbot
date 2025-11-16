export const firebase_signin_user = (payload, dispatch) => {
  return dispatch({
    type: "firebase_user",
    payload: payload,
  });
};
export const firebase_signout_user = (dispatch) => {
  return dispatch({
    type: "firebase_user_signout",
  });
};
export const side_menu = (dispatch) => {
  return dispatch({
    type: "side_menu",
  });
};

export const show_emoji_pannel = (dispatch) => {
  return dispatch({
    type: "show_emoji_pannel",
  });
};

export const get_emoji = (payload, dispatch) => {
  return dispatch({
    type: "get_emoji",
    payload: payload,
  });
};

export const set_prompt = (payload, dispatch) => {
  return dispatch({
    type: "set_prompt",
    payload: payload,
  });
};
export const get_prompt = (dispatch) => {
  return dispatch({
    type: "get_prompt",
  });
};
export const clear_prompt = (dispatch) => {
  return dispatch({
    type: "clear_prompt",
  });
};

export const show_login_form = (dispatch) => {
  return dispatch({
    type: "show_login_form",
  });
};

export const send_message = (payload, dispatch) => {
  return dispatch({
    type: "send_message",
    payload: payload,
  });
};

export const login = (payload, dispatch) => {
  return dispatch({
    type: "login",
    payload: payload,
  });
};
export const signUp = (payload, dispatch) => {
  return dispatch({
    type: "signUp",
    payload: payload,
  });
};

export const signOut = (dispatch) => {
  return dispatch({
    type: "signOut",
  });
};
export const clearChat = (dispatch) =>{
  return dispatch({
    type:"clearChat",
  });
}
export const setSocketToReducer = (payload, dispatch) => {
  return dispatch({
    type: "setSocket",
    payload: payload,
  });
};
export const getSocketFromReducer = (dispatch) => {
  return dispatch({
    type: "getSocket",
  });
};

export const sendAttachment = (payload, dispatch) => {
  return dispatch({
    type: "sendAttachment",
    payload: payload,
  });
};

export const adminSideMenu = (dispatch)=>{
  return dispatch({
    type:"admin_side_menu"
  });
}

export const addChatbot = (payload,dispatch)=>{
  return dispatch({
    type:"addChatbot",
    payload : payload
  })
}

export const viewAllChatbots = (dispatch)=>{
  return dispatch({
    type:"viewAllChatbots"
  })
}

export const deleteChatbotFromReducer = (payload,dispatch)=>{
  return dispatch({
    type:"deleteChatbot",
    payload:payload
  })
}

export const updateChatbotFromReducer = (payload,dispatch)=>{
  return dispatch({
    type:"updateChatbot",
    payload:payload
  })
}

export const selectChatbot = (payload,dispatch)=>{
  return dispatch({
    type:"selectChatbot",
    payload:payload
  })
}