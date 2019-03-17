import { PROFILE_GET_DATA, CONNECTION_ERROR } from "../actions/types";

const DEFAULT_STATE = {
  profile: "",
  isLoading: true,
  error: ""
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case PROFILE_GET_DATA:
      return { ...state, error: "", profile: action.payload };
    case CONNECTION_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
