import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
import Profile from "./components/Profile";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Contact from "./components/Contact";
import Admin from './components/admin/Admin';
import reducers from "./reducers"; 

import Categories from "./components/Categories";

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

/////
// const { whyDidYouUpdate } = require("why-did-you-update");
// whyDidYouUpdate(React);
/////

ReactDOM.render(
  <Provider
    store={createStore(
      reducers,
      initialState,
      compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    )}
  >
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/:cat" component={Categories} /> */}
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/cart" component={authGuard(Cart)} />
          <Route exact path="/profile" component={authGuard(Profile)} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path='/admin' component={Admin}/> 
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
registerServiceWorker();
