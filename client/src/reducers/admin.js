//USERS_GET_DATA


import {
    USERS_GET_DATA,
    LOADING_TRUE,
    CONNECTION_ERROR
  } from "../actions/types";
  
  const DEFAULT_STATE = {
    users: [],
    isLoading: true,
    error: ""
  };
  
  export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case USERS_GET_DATA:
        return {
          ...state,
          isLoading: false,
          error: "",
          users: action.payload
        };
      case CONNECTION_ERROR:
        return { ...state, isLoading: false, error: action.payload };
      default:
        return state;
    }
  };