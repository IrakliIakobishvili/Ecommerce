import {
  PROFILE_GET_DATA,
  GET_ORDER,
  CONNECTION_ERROR
} from "../actions/types";

const DEFAULT_STATE = {
  profile: "",
  order: [],
  isLoading: true,
  error: ""
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case PROFILE_GET_DATA:
      return { ...state, error: "", isLoading: false, profile: action.payload };
    case GET_ORDER:
      return { ...state, error: "", isLoading: false, order: action.payload };
    case CONNECTION_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
