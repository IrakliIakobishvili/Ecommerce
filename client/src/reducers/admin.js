import {
  USERS_GET_DATA,
  GET_CATEGORIES_ADMIN,
  GET_CONTACTS_ADMIN,
  CONNECTION_ERROR
} from "../actions/types";

const DEFAULT_STATE = {
  users: [],
  categories: [],
  contacts: [],
  isLoading: true,
  error: false
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case USERS_GET_DATA:
      return {
        ...state,
        isLoading: false,
        error: false,
        users: action.payload
      };
    case GET_CATEGORIES_ADMIN:
      return {
        ...state,
        isLoading: false,
        error: false,
        categories: action.payload
      };
    case GET_CONTACTS_ADMIN:
      return {
        ...state,
        isLoading: false,
        error: false,
        contacts: action.payload
      };
    case CONNECTION_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
