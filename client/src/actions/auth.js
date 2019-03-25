import axios from "axios";
import {
  AUTH_SIGN_UP,
  AUTH_SIGN_OUT,
  AUTH_SIGN_IN,
  ACTIVE_HEADER_LINK,
  CLEAR_ACTIVE_LINKS,
  REGISTER_ERROR,
  LOGIN_ERROR,
  AUTH_SUCCESS
} from "./types";
import { API_URL } from "../config";

export const oauthGoogle = data => {
  return async dispatch => {
    const res = await axios.post(`${API_URL}/api/users/oauth/google`, {
      access_token: data
    });

    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data.token
    });

    localStorage.setItem("JWT_TOKEN", res.data.token);
    axios.defaults.headers.common["Authorization"] = res.data.token;
  };
};

export const oauthFacebook = data => {
  return async dispatch => {
    const res = await axios.post(`${API_URL}/api/users/oauth/facebook`, {
      access_token: data
    });

    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data.token
    });

    localStorage.setItem("JWT_TOKEN", res.data.token);
    axios.defaults.headers.common["Authorization"] = res.data.token;
  };
};

export const signUp = data => {
  return async dispatch => {
    await axios
      .post(`${API_URL}/api/users/signup`, data)
      .then(function(res) {
        console.log(res.data);
        dispatch({
          type: AUTH_SUCCESS,
          payload: "Please verify your Email"
        });
      })
      .catch(function(error) {
        if (error.response.status === 409) {
          dispatch({
            type: REGISTER_ERROR,
            payload: error.response.data
          });
        } else {
          dispatch({
            type: REGISTER_ERROR,
            payload: "Something Wrong, Try Later"
          });
        }
      });
  };
};

// export const signOut = () => {
//   return dispatch => {
//     localStorage.removeItem('JWT_TOKEN');
//     axios.defaults.headers.common['Authorization'] = '';
//   };
// }

export const signIn = data => {
  return async dispatch => {
    await axios
      .post(`${API_URL}/api/users/signin`, data)
      .then(function(res) {
        dispatch({
          type: AUTH_SIGN_IN,
          payload: res.data.token
        });
        localStorage.setItem("JWT_TOKEN", res.data.token);
        axios.defaults.headers.common["Authorization"] = res.data.token;
      })
      .catch(function(error) {
        if (error.response.status === 401 || error.response.status === 409) {
          dispatch({
            type: LOGIN_ERROR,
            payload: error.response.data
          });
        } else {
          dispatch({
            type: LOGIN_ERROR,
            payload: "Something Wrong, Try Later"
          });
        }
      });
  };
};

export const signOut = () => {
  return async dispatch => {
    localStorage.removeItem("JWT_TOKEN");
    axios.defaults.headers.common["Authorization"] = "";
    dispatch({
      type: AUTH_SIGN_OUT,
      payload: ""
    });
  };
};
