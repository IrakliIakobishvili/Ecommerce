import axios from "axios";
import { API_URL } from "../config";
import { USERS_GET_DATA, CONNECTION_ERROR } from "./types";

export const getUsersByTitle = title => {
  return async dispatch => {
    try {
      const res = await axios.get(`${API_URL}/api/users/search/${title}`);
      dispatch({
        type: USERS_GET_DATA,
        payload: res.data
      });
    } catch (err) {
      console.error("err", err);
      dispatch({
        type: CONNECTION_ERROR,
        payload: "Network error, API is Unavailable (From admin.js (catch))"
      });
    }
  };
};

export const getUsers = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`${API_URL}/api/users/`);
      // console.log(res.data);

      dispatch({
        type: USERS_GET_DATA,
        payload: res.data
      });
    } catch (err) {
      console.error("err", err);
      dispatch({
        type: CONNECTION_ERROR,
        payload: "Network error, API is Unavailable (From admin.js (catch))"
      });
    }
  };
};
