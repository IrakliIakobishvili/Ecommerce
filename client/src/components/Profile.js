import React, { Component } from "react";
import { BrowserRouter, Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProfile } from "../actions/profile";
import { getCartItems } from "../actions/cart";
// import { BrowserRouter } from "react-router-dom";

import { ChangePassword } from "./profile/ChangePassword";
import {ProductView, MyOrders } from "./profile/MyOrders";
import { NestedView } from "./profile/Nasted";
import { NavBar } from "./profile/NavBar";

import "../styles/profile.css";
// import ChangePassword from "./ChangePassword";

class Profile extends Component {
  async componentDidMount() {
    this.props.getProfile();
    this.props.getCartItems();
  }

  render() {
    const { profileContent } = this.props;
    const content = Object.keys(profileContent).length ? (
      <p>{profileContent}</p>
    ) : this.props.isLoading ? (
      <h1>Loading...</h1>
    ) : this.props.error ? (
      <h1>{this.props.error}</h1>
    ) : null;

    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Route exact path="/change_password" component={ChangePassword} />
          <Route path="/another" component={() => <div>yo!</div>} />
          <Route path="/my_orders" component={MyOrders} />
          <Route path="/product/:id" component={ProductView} />
          <Route path="/nested" component={NestedView} />
        </div>
      </BrowserRouter>
    );
  }
}
function mapStateToProps(state) {
  return {
    profileContent: state.profile.profile,
    isLoading: state.profile.isLoading,
    error: state.profile.error
  };
}

export default connect(
  mapStateToProps,
  { getProfile, getCartItems }
)(Profile);
