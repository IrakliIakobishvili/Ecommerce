import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./auth";
import profileReducer from "./profile";
import productsReducer from "./products";
import cartReducer from "./cart";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  profile: profileReducer,
  products: productsReducer,
  cart: cartReducer
});