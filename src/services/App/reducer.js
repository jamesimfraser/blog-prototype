import { TOGGLE_FORM, SET_POST } from "./types";

const initialState = {
  formActive: false,
  currentPost: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FORM:
      return { ...state, formActive: !state.formActive };
    case SET_POST:
      return { ...state, currentPost: action.payload };
    default:
      return state;
  }
};
