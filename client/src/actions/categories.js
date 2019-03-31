import axios from "axios";
import { API_URL } from "../config";
import { GET_CATEGORIES, CONNECTION_ERROR } from "./types";

export const getCategories = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`${API_URL}/api/categories/`);
      // console.log(res.data);

      dispatch({
        type: GET_CATEGORIES,
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
