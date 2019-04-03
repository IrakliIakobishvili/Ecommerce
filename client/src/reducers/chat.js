import {
    GET_MESSAGES,
    CONNECTION_ERROR
  } from "../actions/types";
  
  const DEFAULT_STATE = {
    messages: [],
    error: false
  };
  
  export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case GET_MESSAGES:
        return { ...state, messages: action.payload };
      case CONNECTION_ERROR:
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  