import {
  GET_ORDERS,
  ORDER_FAILED,
  ORDER_FINISHED,
  CONNECTION_ERROR
} from "../actions/types";

const DEFAULT_STATE = {
  orders: [],
  response: "",
  isLoading: true,
  error: ""
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        isLoading: false,
        error: "",
        orders: action.payload
      };
    case ORDER_FAILED:
      return {
        ...state,
        isLoading: false,
        error: "",
        response: action.payload
      };
    case ORDER_FINISHED:
      return {
        ...state,
        isLoading: false,
        error: "",
        response: action.payload
      };
    case CONNECTION_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
