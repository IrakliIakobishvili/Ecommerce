import { GET_CATEGORIES, CONNECTION_ERROR } from "../actions/types";

const DEFAULT_STATE = {
  categories: [],
  isLoading: true,
  error: false
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        isLoading: false,
        active: "",
        error: false,
        categories: action.payload
      };
    case CONNECTION_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
