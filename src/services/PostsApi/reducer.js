import { GET_POSTS, FETCH, ADD_POST, REMOVE_POST, GET_COMMENTS } from "./types";

const initialState = {
  posts: [],
  comments: [],
  fetching: { posts: false, comments: false },
  formActive: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        fetching: { ...state.fetching, [action.payload]: true }
      };
    case GET_POSTS:
      return {
        ...state,
        fetching: { ...state.fetching, posts: false },
        posts: action.payload
      };
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
        fetching: { ...state.fetching, comments: false },
        comments: action.payload
      };
    default:
      return state;
  }
};
