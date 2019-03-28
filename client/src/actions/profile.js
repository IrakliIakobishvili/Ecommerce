import axios from "axios";
import { PROFILE_GET_DATA, CONNECTION_ERROR } from "./types";
import { API_URL } from "../config";

export const getProfile = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`${API_URL}/api/users/page/profile`);
      dispatch({
        type: PROFILE_GET_DATA,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CONNECTION_ERROR,
        payload: "Connection Error (From Profile.js)"
      });
    }
  };
};
