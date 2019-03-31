import axios from "axios";
import { API_URL } from "../config";
import {
  CONTACT_FEEDBACK,
  CONTACT_FEEDBACK_CLEAR,
  CONNECTION_ERROR
} from "./types";

export const saveContact = message => {
  return async dispatch => {
    try {
      const res = await axios.post(`${API_URL}/api/contact`, {
        // ...message
        firstName: message.firstName,
        lastName: message.lastName,
        email: message.email,
        message: message.message
      });
      console.log(res.data);
      dispatch({
        type: CONTACT_FEEDBACK,
        payload: res.data
      });
    } catch (err) {
      console.error("err", err);
      dispatch({
        type: CONNECTION_ERROR,
        payload: "Network error, API is Unavailable (From contact.js (catch))"
      });
    }
  };
};

export const clearFeedback = id => {
  return async dispatch => {
    try {
      dispatch({
        type: CONTACT_FEEDBACK_CLEAR,
        payload: ""
      });
    } catch (err) {
      console.error("err", err);
    }
  };
};
