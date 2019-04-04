import axios from "axios";
import { API_URL } from "../config";
import {
  PRODUCTS_GET_DATA,
  PRODUCT_GET_DETAILS,
  LOADING_TRUE,
  CONNECTION_ERROR
} from "./types";

export const getCategoryAndProducts = () => {
  return async dispatch => {
    try {
      axios
        .get(`${API_URL}/api/products`)
        .then(res => {
          return axios.get(`${API_URL}/api/categories`);
        })
        .then(res => {});
    } catch (err) {
      console.error("err", err);
      dispatch({
        type: CONNECTION_ERROR,
        payload: true
      });
    }
  };
};

export const getProducts = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`${API_URL}/api/products/`);
      dispatch({
        type: PRODUCTS_GET_DATA,
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

export const getProductsByCat = id => {
  return async dispatch => {
    try {
      dispatch({
        type: LOADING_TRUE,
        payload: true
      });
      const res = await axios.get(`${API_URL}/api/products/category/${id}`);
      dispatch({
        type: PRODUCTS_GET_DATA,
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

export const getProductsByTitle = title => {
  return async dispatch => {
    try {
      const res = await axios.get(`${API_URL}/api/products/search/${title}`);
      dispatch({
        type: PRODUCTS_GET_DATA,
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

export const getFilteredProducts = params => {
  return async dispatch => {
    try {
      const res = await axios.post(`${API_URL}/api/products/filter`, {
        ...params
      });
      dispatch({
        type: PRODUCTS_GET_DATA,
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

export const getProductDetails = id => {
  return async dispatch => {
    try {
      dispatch({
        type: LOADING_TRUE,
        payload: true
      });
      const res = await axios.get(`${API_URL}/api/products/${id}`);
      dispatch({
        type: PRODUCT_GET_DETAILS,
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
