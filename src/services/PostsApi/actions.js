import { GET_POSTS, FETCH, ADD_POST, REMOVE_POST, GET_COMMENTS } from "./types";
import api from "../../utils/api";

export const getPosts = () => dispatch => {
  dispatch({
    type: FETCH
  });

  return api("https://jsonplaceholder.typicode.com/posts")
    .then(response =>
      dispatch({
        type: GET_POSTS,
        payload: response
      })
    )
    .catch(err => alert(err));
};

export const addPost = post => dispatch =>
  api("https://jsonplaceholder.typicode.com/posts", post, "POST")
    .then(response => dispatch({ type: ADD_POST, payload: response }))
    .catch(err => alert(err));

export const removePost = id => dispatch => {
  return api(`https://jsonplaceholder.typicode.com/posts/${id}`, {}, "DELETE")
    .then(() => dispatch({ type: REMOVE_POST, payload: id }))
    .catch(err => alert(err));
};

export const getComments = id => dispatch => {
  return api(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
    {},
    "GET"
  )
    .then(response => dispatch({ type: GET_COMMENTS, payload: response }))
    .catch(err => alert(err));
};
