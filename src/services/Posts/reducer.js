import {
  GET_POSTS,
  FETCH_POSTS,
  ADD_POST,
  REMOVE_POST,
  TOGGLE_FORM
} from "./types";

const initialState = {
  posts: [],
  fetching: false,
  formActive: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, fetching: true };
    case GET_POSTS:
      return { ...state, posts: action.payload, fetching: false };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        formActive: false
      };
    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload)
      };
    case TOGGLE_FORM:
      return { ...state, formActive: !state.formActive };
    default:
      return state;
  }
};
