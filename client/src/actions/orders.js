import axios from "axios";
import {
  GET_CART_ITEMS,
  EMPTY_CART,
  ORDER_FAILED,
  CONNECTION_ERROR,
  ORDER_FINISHED
} from "./types";
import { API_URL } from "../config";

export const saveOrder = (order, totalPrice) => {
  return async dispatch => {
    try {
      const res = await axios.post(`${API_URL}/api/order`, {
        order,
        totalPrice
      });
      const { message, success } = res.data;
      if (success) {
        dispatch({
          type: ORDER_FINISHED,
          payload: message
        });
        dispatch({
          type: EMPTY_CART,
          payload: []
        });
      } else {
        dispatch({
          type: ORDER_FAILED,
          payload: message
        });
      }
    } catch (err) {
      console.error("err", err);
      dispatch({
        type: CONNECTION_ERROR,
        payload: true
      });
    }
  };
};

export const getCartItems = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`${API_URL}/api/cart`);
      dispatch({
        type: GET_CART_ITEMS,
        payload: res.data.items
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
        payload: true
      });
    }
  };
};

export const emptyCart = () => {
  return async dispatch => {
    try {
      const res = await axios.delete(`${API_URL}/api/cart`);
      dispatch({
        type: EMPTY_CART,
        payload: []
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
