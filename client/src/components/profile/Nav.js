import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// import { getOrder } from "../../actions/profile";

class Nav extends Component {
  render() {
    return (
      <nav className="profile-page-nav">
        <h3 className="profile-page-nav__heading">SETTINGS</h3>
        <ul className="profile-list">
          <li className="profile-list__item">
            <Link className="profile-list__item__link" to="/profile/">
              Details
            </Link>
          </li>
          <li className="profile-list__item">
            <Link
              // onClick={() => this.props.getOrder()}
              className="profile-list__item__link"
              to="/profile/orders"
            >
              Shopping History
            </Link>
          </li>
          <li className="profile-list__item">
            <Link className="profile-list__item__link" to="/profile/reset">
              Reset Password
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default connect(
  null,
  null
)(Nav);
