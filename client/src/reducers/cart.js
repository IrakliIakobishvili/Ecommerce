import {
  ADD_PRODUCT_TO_CART,
  GET_CART_ITEMS,
  EMPTY_CART,
  CONNECTION_ERROR
} from "../actions/types";

const DEFAULT_STATE = {
  products: [],
  isLoading: true,
  error: false
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return {
        ...state,
        products: state.products.includes(action.payload)
          ? state.products.filter(id => id !== action.payload)
          : [...state.products, action.payload]
      };
    case GET_CART_ITEMS:
      return {
        ...state,
        error: false,
        products: action.payload,
        isLoading: false
      };
    case EMPTY_CART:
      return { ...state, error: false, products: [], isLoading: false };
    case CONNECTION_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
