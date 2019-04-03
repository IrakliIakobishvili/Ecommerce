import axios from "axios";
import { API_URL } from "../config";
import { SEND_MESSAGE, GET_MESSAGES, CONNECTION_ERROR } from "./types";

export const sendMessage = message => {
  return async dispatch => {
    try {
      const res = await axios.post(`${API_URL}/api/chat`, {
        text: message
      });
      console.log(res.data);
      dispatch({
        type: SEND_MESSAGE,
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

export const getMessages = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`${API_URL}/api/chat/user`);
      // res.data;
      console.log(res.data);
      dispatch({
        type: GET_MESSAGES,
        payload: res.data.messages
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

// export const clearFeedback = id => {
//   return async dispatch => {
//     try {
//       dispatch({
//         type: CONTACT_FEEDBACK_CLEAR,
//         payload: ""
//       });
//     } catch (err) {
//       console.error("err", err);
//     }
//   };
// };
