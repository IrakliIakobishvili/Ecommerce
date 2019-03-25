import axios from "axios";
import {
  ADD_PRODUCT_TO_CART,
  GET_CART_ITEMS,
  EMPTY_CART,
  CONNECTION_ERROR
} from "./types";
import { API_URL } from "../config";

export const addToCart = (product, quantity) => {
  return async dispatch => {
    try {
      const res = await axios.post(`${API_URL}/api/cart`, {
        product,
        quantity
      });
      console.log("post res");
      const newRes = await axios.get(`${API_URL}/api/cart`);
      dispatch({
        type: GET_CART_ITEMS,
        payload: newRes.data.items
      });
      // console.log(newRes);
    } catch (err) {
      console.error("err", err);
      dispatch({
        type: CONNECTION_ERROR,
        payload: "Network error, API is Unavailable (From cart.js (catch))"
      });
    }
  };
};

export const getCartItems = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`${API_URL}/api/cart`);
      // res.data;
      // console.log(res.data);
      dispatch({
        type: GET_CART_ITEMS,
        payload: res.data.items
      });
    } catch (err) {
      console.error("err", err);
      dispatch({
        type: CONNECTION_ERROR,
        payload: "Network error, API is Unavailable (From cart.js (catch))"
      });
    }
  };
};

export const removeItemFromCart = product => {
  return async dispatch => {
    try {
      const res = await axios.put(`${API_URL}/api/cart`, {
        itemId: product
      });
      const newRes = await axios.get(`${API_URL}/api/cart`);
      dispatch({
        type: GET_CART_ITEMS,
        payload: newRes.data.items
      });
      console.log(newRes);
    } catch (err) {
      console.error("err", err);
      dispatch({
        type: CONNECTION_ERROR,
        payload: "Network error, API is Unavailable (From cart.js (catch))"
      });
    }
  };
};

export const emptyCart = () => {
  return async dispatch => {
    try {
      const res = await axios.delete(`${API_URL}/api/cart`);
      // console.log(res);
      dispatch({
        type: EMPTY_CART,
        payload: []
      });
    } catch (err) {
      console.error("err", err);
      dispatch({
        type: CONNECTION_ERROR,
        payload: "Network error, API is Unavailable (From cart.js (catch))"
      });
    }
  };
};
