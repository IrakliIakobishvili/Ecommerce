import axios from "axios";
import { API_URL } from "../config";
import { GET_REVIEWS, CONNECTION_ERROR } from "./types";

export const getProductReviews = id => {
  return async dispatch => {
    try {
      const res = await axios.get(`${API_URL}/api/review/${id}`);
      console.log("review start");
      console.log(res.data);
      console.log("review end");
      dispatch({
        type: GET_REVIEWS,
        payload: res.data
      });
    } catch (err) {
      console.error("err", err);
      dispatch({
        type: CONNECTION_ERROR,
        payload: "Connection error || Wrong URL"
      });
    }
  };
};
