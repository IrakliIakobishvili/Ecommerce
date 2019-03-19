// import axios from "axios";
// import { API_URL } from "../config";
// import { GET_FILTERED_PRODUCT, CONNECTION_ERROR } from "./types";

// export const getFilteredProducts = (params) => {
//   return async dispatch => {
//     try {
//       const res = await axios.post(`${API_URL}/api/products/`, params);

//       dispatch({
//         type: GET_FILTERED_PRODUCT,
//         payload: res.data
//       });
//     } catch (err) {
//       console.error("err", err);
//       dispatch({
//         type: CONNECTION_ERROR,
//         payload: "Network error, API is Unavailable (From filter.js (catch))"
//       });
//     }
//   };
// };
