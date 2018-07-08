import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import root from "./services/root-reducer";

const initialState = {};
const middleware = [thunk];

export default createStore(root, initialState, applyMiddleware(...middleware));
