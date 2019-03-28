import { GET_REVIEWS, CONNECTION_ERROR } from "../actions/types";

const DEFAULT_STATE = {
  reviews: [],
  rating: [],
  isLoading: true,
  error: ""
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return {
        ...state,
        isLoading: false,
        error: "",
        reviews: action.payload.reviews,
        rating: action.payload.rating
      };
    case CONNECTION_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
