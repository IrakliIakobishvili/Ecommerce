import { ADD_PRODUCT_TO_CART } from "../actions/types";

const DEFAULT_STATE = {
  products: []
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
    default:
      return state;
  }
};
