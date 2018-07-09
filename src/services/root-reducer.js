import { combineReducers } from "redux";
import postReducer from "./PostsApi/reducer";
import appReducer from "./App/reducer";

export default combineReducers({
  posts: postReducer,
  app: appReducer
});
