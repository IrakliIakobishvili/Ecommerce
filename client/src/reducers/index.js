import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./auth";
import profileReducer from "./profile";
import productsReducer from "./products";
import categoriesReducer from "./categories";
import cartReducer from "./cart";
import orderReducer from "./orders";
import reviewReducer from "./reviews";
import adminReducer from "./admin";
import contactReducer from "./contact";
import activeReducer from "./activeLinks";
import verifyReducer from "./verify";
import chatReducer from "./chat";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  profile: profileReducer,
  categories: categoriesReducer,
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
  reviews: reviewReducer,
  admin: adminReducer,
  contact: contactReducer,
  activeLinks: activeReducer,
  verify: verifyReducer,
  chat: chatReducer
});
