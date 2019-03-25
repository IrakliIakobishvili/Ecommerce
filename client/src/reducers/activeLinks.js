import {
  ACTIVE_HEADER_LINK,
  ACTIVE_CATEGORY_LINK,
  CLEAR_ACTIVE_LINKS
} from "../actions/types";

const DEFAULT_STATE = {
  topNav: "",
  catNav: ""
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ACTIVE_HEADER_LINK:
      return { ...state, topNav: action.payload };
    case ACTIVE_CATEGORY_LINK:
      return { ...state, catNav: action.payload };
    case CLEAR_ACTIVE_LINKS:
      return { ...state, catNav: "", topNav: "" };
    default:
      return state;
  }
};
