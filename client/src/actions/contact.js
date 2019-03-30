import axios from "axios";
import { API_URL } from "../config";
import { SAVE_CONTACT, CONNECTION_ERROR } from "./types";

export const saveContact = message => {
  return async dispatch => {
    try {
      const res = await axios.post(`${API_URL}/api/products`, { message });
      console.log(res.data);
      dispatch({
        type: SAVE_CONTACT,
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
