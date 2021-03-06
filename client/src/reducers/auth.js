import {
  AUTH_SIGN_UP,
  AUTH_SIGN_OUT,
  AUTH_SIGN_IN,
  ACTIVE_HEADER_LINK,
  REGISTER_ERROR,
  LOGIN_ERROR,
  CLEAR_AUTH_FEEDBACK,
  AUTH_SUCCESS
} from "../actions/types";

const DEFAULT_STATE = {
  isAuthenticated: false,
  token: "",
  registerError: "",
  loginError: "",
  activeLink: ""
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case AUTH_SIGN_UP:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        registerError: ""
      };
    case AUTH_SIGN_IN:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        loginError: ""
      };
    case AUTH_SIGN_OUT:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: false,
        registerError: "",
        loginrError: ""
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        success: action.payload,
        registerError: "",
        loginrError: ""
      };
    case REGISTER_ERROR:
      return { ...state, registerError: action.payload };
    case CLEAR_AUTH_FEEDBACK:
      return {
        ...state,
        loginError: action.payload,
        registerError: action.payload
      };
    case ACTIVE_HEADER_LINK:
      return { ...state, activeLink: action.payload };
    case LOGIN_ERROR:
      return { ...state, loginError: action.payload };
    default:
      return state;
  }
};
