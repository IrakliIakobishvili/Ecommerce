import axios from "axios";
import { API_URL } from "../config";
import {
  USERS_GET_DATA,
  PRODUCTS_GET_DATA,
  CONNECTION_ERROR,
  GET_CATEGORIES_ADMIN,
  GET_CONTACTS_ADMIN
} from "./types";

export const getUsersByTitle = title => {
  return async dispatch => {
    try {
      const res = await axios.get(`${API_URL}/api/users/search/${title}`);
      dispatch({
        type: USERS_GET_DATA,
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

export const getUsers = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`${API_URL}/api/users/`);
      dispatch({
        type: USERS_GET_DATA,
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

export const getCategoriesByTitle = title => {
  return async dispatch => {
    try {
      const res = await axios.get(`${API_URL}/api/categories/search/${title}`);
      dispatch({
        type: GET_CATEGORIES_ADMIN,
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

export const addCategory = data => {
  return async dispatch => {
    try {
      const res = await axios.post(`${API_URL}/api/categories`, {
        title: data.title,
        categoryID: data.categoryID
      });
      console.log(res.data);
    } catch (err) {
      console.error("err", err);
      dispatch({
        type: CONNECTION_ERROR,
        payload: true
      });
    }
  };
};

export const getCategoriesAdmin = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`${API_URL}/api/categories/`);
      dispatch({
        type: GET_CATEGORIES_ADMIN,
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

export const updateUser = data => {
  return async dispatch => {
    try {
      const res = await axios.put(`${API_URL}/api/users/${data.id}`, {
        ...data
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

export const addProduct = data => {
  return async dispatch => {
    try {
      axios({
        method: "post",
        url: `${API_URL}/api/products`,
        data: data,
        config: { headers: { "Content-Type": "multpart/form-data" } }
      })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(response) {
          console.log(response);
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

export const getContacts = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`${API_URL}/api/contact/`);
      dispatch({
        type: GET_CONTACTS_ADMIN,
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
