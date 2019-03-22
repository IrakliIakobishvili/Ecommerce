import {
  ACTIVE_HEADER_LINK,
  ACTIVE_CATEGORY_LINK,
  CLEAR_ACTIVE_LINKS
} from "./types";

export const ActiveHeaderLink = className => {
  return async dispatch => {
    try {
      dispatch({
        type: ACTIVE_HEADER_LINK,
        payload: className
      });
    } catch (err) {
      console.error("err", err);
    }
  };
};
export const clearActiveLinks = () => {
  return async dispatch => {
    try {
      dispatch({
        type: CLEAR_ACTIVE_LINKS,
        payload: ""
      });
    } catch (err) {
      console.error("err", err);
    }
  };
};

export const detectActiveLink = category => {
  return async dispatch => {
    try {
      dispatch({
        type: ACTIVE_CATEGORY_LINK,
        payload: category
      });
    } catch (err) {
      console.error("err", err);
    }
  };
};
