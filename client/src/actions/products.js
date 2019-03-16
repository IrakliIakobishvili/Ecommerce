import axios from "axios";
import { API_URL } from "../config";
import {
  PRODUCTS_GET_DATA,
  PRODUCT_GET_DETAILS,
  CONNECTION_ERROR
} from "./types";

export const getProducts = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`${API_URL}/api/products/`);
      console.log(res.data);

      dispatch({
        type: PRODUCTS_GET_DATA,
        payload: res.data
      });
    } catch (err) {
      console.error("err", err);
      dispatch({
        type: CONNECTION_ERROR,
        payload: "Network error, API is Unavailable (From product.js (catch))"
      });
    }
  };
};

export const getProductDetails = id => {
  return async dispatch => {
    try {
      const res = await axios.get(`${API_URL}/api/products/${id}`);
      console.log("DATA");
      console.log(res.data);
      dispatch({
        type: PRODUCT_GET_DETAILS,
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
