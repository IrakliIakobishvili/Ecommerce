import axios from "axios";
import { API_URL } from "../config";
import { GET_REVIEWS, CONNECTION_ERROR } from "./types";

export const getProductReviews = id => {
  return async dispatch => {
    try {
      const res = await axios.get(`${API_URL}/api/review/${id}`);
      //   console.log(res.data.reviews);
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

export const addProductReview = (id, message, rating) => {
  return async dispatch => {
    try {
      const res = await axios
        .post(`${API_URL}/api/review`, {
          productID: id,
          message: message,
          rating: rating
        })
        .then(res => {
          return axios.get(`${API_URL}/api/review/${id}`);
        })
        .then(res => {
          dispatch({
            type: GET_REVIEWS,
            payload: res.data
          });
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
