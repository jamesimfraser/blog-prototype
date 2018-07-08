import { combineReducers } from "redux";
import postReducer from "./Posts/reducer";

export default combineReducers({
  posts: postReducer
});
