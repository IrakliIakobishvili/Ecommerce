import axios from "axios";
import { ADD_PRODUCT_TO_CART, CONNECTION_ERROR } from "./types";
import { API_URL } from "../config";

export const addToCart = id => {
  return async dispatch => {
    try {
      //   const res = await axios.get("http://localhost:5000/profile");
      dispatch({
        type: ADD_PRODUCT_TO_CART,
        payload: id
      });
    } catch (err) {
      console.error("err", err);
    }
  };
};
