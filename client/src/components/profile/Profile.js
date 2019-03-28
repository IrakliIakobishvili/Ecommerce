import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProfile } from "../../actions/profile";
import { getCartItems } from "../../actions/cart";

import Nav from "./Nav";
import Reset from "./Reset";
import Orders from "./Orders";
import My404Component from "../../components/My404Component";
import "../../styles/profile.css";

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

    console.log(this.props.match.url);
    return (
      <div className="profile-page">
        <BrowserRouter>
          <div className="container">
            <div className="profile-page-wrapper">
              <div className="profile-page-aside">
                <Nav />
                {/* {content} */}
              </div>
              <div className="profile-page-content">
                <Route exact path="/profile/reset" component={Reset} />
                <Route exact path="/profile/orders" component={Orders} />
              </div>
            </div>
          </div>
        </BrowserRouter>
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
