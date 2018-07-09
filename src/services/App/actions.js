import { TOGGLE_FORM, SET_POST } from "./types";

export const toggleForm = () => ({ type: TOGGLE_FORM });
export const setPost = post => ({ type: SET_POST, payload: post });
