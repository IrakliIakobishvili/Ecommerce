import {
  PRODUCTS_GET_DATA,
  PRODUCT_GET_DETAILS,
  LOADING_TRUE,
  CONNECTION_ERROR
} from "../actions/types";

const DEFAULT_STATE = {
  products: [],
  details: {},
  reviews: [],
  isLoading: true,
  error: false
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case PRODUCTS_GET_DATA:
      return {
        ...state,
        isLoading: false,
        error: false,
        products: action.payload
      };
    case PRODUCT_GET_DETAILS:
      return {
        ...state,
        isLoading: false,
        error: false,
        details: action.payload
      };
    case LOADING_TRUE:
      return { ...state, isLoading: true };
    case CONNECTION_ERROR:
      return { ...state, isLoading: false, error: true };
    default:
      return state;
  }
};
