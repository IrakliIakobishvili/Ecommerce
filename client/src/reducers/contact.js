import {
  CONTACT_FEEDBACK,
  CONTACT_FEEDBACK_CLEAR,
  CONNECTION_ERROR
} from "../actions/types";

const DEFAULT_STATE = {
  feedback: "",
  error: ""
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case CONTACT_FEEDBACK:
      return { ...state, feedback: action.payload };
    case CONTACT_FEEDBACK_CLEAR:
      return { ...state, feedback: action.payload };
    case CONNECTION_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
