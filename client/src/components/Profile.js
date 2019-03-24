import React, { Component } from "react";
import { Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProfile } from "../actions/profile";
import { getCartItems } from "../actions/cart";
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
      <div className="profile-page">
        <div className="container">
          <h1>Profile Page</h1>
          {content}
        </div>

        <div className="profile-nav-conteiner">
          <div className="profile-nav-conteiner-item">
            <Link className="profile-item-link" to="/myOrders">
              My Orders
            </Link>
          </div>

          <div className="profile-nav-conteiner-item">
            <Link className="profile-item-link" to="/changePassword">
              Change Password
            </Link>
          </div>

          <div className="profile-nav-conteiner-item">
            <Link className="profile-item-link" to="/smth">
              History or smth
            </Link>
          </div>

          {/* <Route path="/about/" component={myOrders} /> */}
          {/* <Route path="/ChangePassword" component={ChangePassword} /> */}
        </div>
      </div>
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
