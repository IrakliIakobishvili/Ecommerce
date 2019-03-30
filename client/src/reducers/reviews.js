import {
  GET_REVIEWS,
  REVIEW_FEEDBACK,
  REVIEW_FEEDBACK_CLEAR,
  CONNECTION_ERROR
} from "../actions/types";

const DEFAULT_STATE = {
  reviews: [],
  rating: [],
  feedback: "",
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
    case REVIEW_FEEDBACK:
      return { ...state, feedback: action.payload };
    case REVIEW_FEEDBACK_CLEAR:
      return { ...state, feedback: action.payload };
    case CONNECTION_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
