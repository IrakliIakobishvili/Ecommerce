import axios from "axios";
import { API_URL } from "../config";
import {
  USERS_GET_DATA,
  CONNECTION_ERROR,
  USER_DELETE,
  GET_CATEGORIES_ADMIN
} from "./types";

export const getUsersByTitle = title => {
  return async dispatch => {
    try {
      const res = await axios.get(`${API_URL}/api/users/search/${title}`);
      console.log("getUsersByTitle start");
      console.log(res.data);
      console.log("getUsersByTitle end");

      // console.log(res);
      dispatch({
        type: USERS_GET_DATA,
        payload: res.data
      });
    } catch (err) {
      console.error("err", err);
      dispatch({
        type: CONNECTION_ERROR,
        payload: "Network error, API is Unavailable (From admin.js (catch))"
      });
    }
  };
};

export const getUsers = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`${API_URL}/api/users/`);
      // console.log(res.data);

      dispatch({
        type: USERS_GET_DATA,
        payload: res.data
      });
    } catch (err) {
      console.error("err", err);
      dispatch({
        type: CONNECTION_ERROR,
        payload: "Network error, API is Unavailable (From admin.js (catch))"
      });
    }
  };
};

export const getCategoriesByTitle = title => {
  return async dispatch => {
    try {
      const res = await axios.get(`${API_URL}/api/categories/search/${title}`);
      // console.log("getCatsByTitle start");
      // console.log(res.data)
      // console.log("getCatsByTitle end")
      dispatch({
        type: GET_CATEGORIES_ADMIN,
        payload: res.data
      });
    } catch (err) {
      console.error("err", err);
      dispatch({
        type: CONNECTION_ERROR,
        payload: "Network error, API is Unavailable (From admin.js (catch))"
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
        payload: "Network error, API is Unavailable (From admin.js (catch))"
      });
    }
  };
};

export const getCategoriesAdmin = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`${API_URL}/api/categories/`);
      // console.log("getCategories start")
      // console.log(res.data);
      // console.log("getCategories End")
      dispatch({
        type: GET_CATEGORIES_ADMIN,
        payload: res.data
      });
    } catch (err) {
      console.error("err", err);
      dispatch({
        type: CONNECTION_ERROR,
        payload:
          "Network error, API is Unavailable (From categories.js (catch))"
      });
    }
  };
};
