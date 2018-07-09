import { GET_POSTS, FETCH, ADD_POST, REMOVE_POST, GET_COMMENTS } from "./types";

const initialState = {
  posts: [],
  comments: [],
  fetching: false,
  formActive: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH:
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
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };
    default:
      return state;
  }
};
