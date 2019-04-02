import axios from "axios";
import { API_URL } from "../config";
import {
  PRODUCTS_GET_DATA,
  PRODUCT_GET_DETAILS,
  GET_FILTERED_PRODUCT,
  LOADING_TRUE,
  CLEAR_PRODUCTS_DB,
  GET_REVIEWS,
  CONNECTION_ERROR
} from "./types";

export const getCategoryAndProducts = () => {
  return async dispatch => {
    try {
      axios
        .get(`${API_URL}/api/products`)
        .then(res => {
          console.log("products from all start");
          console.log(res.data);
          console.log("products from all end");
          // dispatch({
          //   type: PRODUCTS_GET_DATA,
          //   payload: res.data
          // });

          return axios.get(`${API_URL}/api/categories`);
        })
        .then(res => {
          console.log("categories start");
          console.log(res.data);
          console.log("categories end");
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

export const getProducts = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`${API_URL}/api/products/`);
      // console.log(res.data);

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
      // console.log(res.data);
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
      console.log("FILTER ");
      console.log(res.data);

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

// export const setLoadingTrue = () => {
//   return async dispatch => {
//     dispatch({
//       type: LOADING_TRUE,
//       payload: true
//     });
//   };
// };

// export const getCategories = () => {
//   return async dispatch => {
//     try {
//       const res = await axios.get(`${API_URL}/api/getCategories`);
//       console.log(res.data);

//       // dispatch({
//       //   type: PRODUCTS_GET_DATA,
//       //   payload: res.data
//       // });
//     } catch (err) {
//       console.error("err", err);
//       dispatch({
//         type: CONNECTION_ERROR,
//         payload: "Network error, API is Unavailable (From product.js (catch))"
//       });
//     }
//   };
// };

export const getProductDetails = id => {
  return async dispatch => {
    try {
      dispatch({
        type: LOADING_TRUE,
        payload: true
      });
      const res = await axios.get(`${API_URL}/api/products/${id}`);
      // console.log("DATA");
      // console.log(res.data);
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

// export const getProductDetails = id => {
//   return async dispatch => {
//     try {
//       dispatch({
//         type: LOADING_TRUE,
//         payload: true
//       });
//       // const res = await axios.get(`${API_URL}/api/products/${id}`);
//       // dispatch({
//       //   type: PRODUCT_GET_DETAILS,
//       //   payload: res.data
//       // });
//       axios
//         .get(`${API_URL}/api/products/${id}`)
//         .then(res => {
//           dispatch({
//             type: PRODUCT_GET_DETAILS,
//             payload: res.data
//           });
//           return axios.get(`${API_URL}/api/review/${id}`);
//         })
//         .then(res => {
//           console.log("review Load start");
//           console.log(res.data);
//           console.log("review Load end");
//           dispatch({
//             type: GET_REVIEWS,
//             payload: res.data
//           });
//         });
//     } catch (err) {
//       console.error("err", err);
//       dispatch({
//         type: CONNECTION_ERROR,
//         payload: "Connection error || Wrong URL"
//       });
//     }
//   };
// };
