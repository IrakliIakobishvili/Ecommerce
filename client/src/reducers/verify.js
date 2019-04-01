import { VERIFY_ACCOUNT, CONNECTION_ERROR } from "../actions/types";

const DEFAULT_STATE = {
  feedback: "",
  error: false
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case VERIFY_ACCOUNT:
      return { ...state, error: false, feedback: action.payload };
    case CONNECTION_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
