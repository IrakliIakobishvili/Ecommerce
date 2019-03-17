import {
  PRODUCTS_GET_DATA,
  PRODUCT_GET_DETAILS,
  CONNECTION_ERROR
} from "../actions/types";

const DEFAULT_STATE = {
  products: [],
  details: {},
  isLoading: true,
  error: ""
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case PRODUCTS_GET_DATA:
      return {
        ...state,
        isLoading: false,
        error: "",
        products: action.payload
      };
    case PRODUCT_GET_DETAILS:
      return { ...state, isLoading: false, error: "", details: action.payload };
    case CONNECTION_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
