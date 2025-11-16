import { combineReducers } from "redux";
import { firebase_user_reducer } from "./firebase_user_reducer";
import { side_menu_reducer } from "./side_menu_reducer";
import { show_emoji_pannel_reducer } from "./show_emoji_pannel_reducer";
import { get_emoji_reducer } from "./get_emoji_reducer";
import { prompt_reducer } from "./prompt_reducer";
import { show_login_form_reducer } from "./show_login_form_reducer";
import { chat_reducer } from "./chat_reducer";
import { auth_reducer } from "./auth_reducer";
import { socket_reducer } from "./socket_reducer";
import { admin_side_menu_reducer } from "./admin_side_menu_reducer";
import { chatbot_reducer } from "./chatbot_reducer";
import { select_chatbot_reducer } from "./select_chatbot_reducer";
export const combinedReducers = combineReducers({
  firebase_user_reducer,
  side_menu_reducer,
  show_emoji_pannel_reducer,
  get_emoji_reducer,
  prompt_reducer,
  show_login_form_reducer,
  chat_reducer,
  auth_reducer,
  socket_reducer,
  admin_side_menu_reducer,
  chatbot_reducer,
  select_chatbot_reducer
});
