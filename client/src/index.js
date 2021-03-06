import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import axios from "axios";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import App from "./components/App";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Profile from "./components/profile/Profile";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Contact from "./components/Contact";
import Admin from "./components/admin/Admin";
import Verify from "./components/Verify";
import My404Component from "./components/My404Component";
import reducers from "./reducers";
import authGuard from "./components/HOCs/authGuard";

const jwtToken = localStorage.getItem("JWT_TOKEN");
axios.defaults.headers.common["Authorization"] = jwtToken;

const initialState = {
  auth: {
    token: jwtToken,
    isAuthenticated: jwtToken ? true : false
  }
};
const middleware = [reduxThunk];
ReactDOM.render(
  <Provider
    store={createStore(
      reducers,
      initialState,
      compose(applyMiddleware(...middleware))
    )}
  >
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/cart" component={authGuard(Cart)} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/admin" component={authGuard(Admin)} />
          <Route exact path="/profile/" component={authGuard(Profile)} />
          <Route exect path="/profile/reset/" component={authGuard(Profile)} />
          <Route exect path="/profile/orders/" component={authGuard(Profile)} />
          <Route exect path="/profile/chat/" component={authGuard(Profile)} />
          <Route exact path="/verify/:token" component={Verify} />
          <Route path="/404" component={My404Component} />
          <Redirect from="*" to="/404" />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
registerServiceWorker();
