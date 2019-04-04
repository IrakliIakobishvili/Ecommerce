import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
// import { getProfile } from "../../actions/profile";
// import { getCartItems } from "../../actions/cart";
import { ActiveHeaderLink } from "../../actions/activeLinks";

import Nav from "./Nav";
import Reset from "./Reset";
import Orders from "./Orders";
import Details from "./Details";
import Chat from "./Chat";
import Admin from "../admin/Admin";
import "../../styles/profile.css";

class Profile extends Component {
  componentDidMount() {
    if (this.props.isAuth) {
      this.props.ActiveHeaderLink("profile-link");
    }
  }
  render() {
    console.log(this.props.match.url);
    return (
      <div className="profile-page">
        <BrowserRouter>
          <div className="container">
            <div className="profile-page-wrapper">
              <div className="profile-page-aside">
                <Nav activeClass="active-profile" />
              </div>
              <div className="profile-page-content">
                <Route exact path="/profile/" component={Details} />
                <Route exact path="/profile/reset" component={Reset} />
                <Route exact path="/profile/orders" component={Orders} />
                <Route exact path="/profile/chat" component={Chat} />
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { ActiveHeaderLink }
)(Profile);
