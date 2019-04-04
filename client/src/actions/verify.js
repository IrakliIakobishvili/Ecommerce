import axios from "axios";
import { API_URL } from "../config";
import { VERIFY_ACCOUNT, CONNECTION_ERROR } from "./types";

export const verifyAccount = token => {
  return async dispatch => {
    try {
      const res = await axios.get(`${API_URL}/api/users/verify/${token}`);
      dispatch({
        type: VERIFY_ACCOUNT,
        payload: res.data
      });
    } catch (err) {
      console.error("err", err);
      dispatch({
        type: CONNECTION_ERROR,
        payload: true
      });
    }
  };
};
