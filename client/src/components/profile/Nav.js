import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Nav extends Component {
  state = {
    activeLink: ""
  };

  activeLinkHandler = async className => {
    await this.setState({ activeLink: className });
    // console.log(this.state.activeLink);
  };

  render() {
    const { activeClass } = this.props;
    return (
      <nav className="profile-page-nav">
        <h3 className="profile-page-nav__heading">SETTINGS</h3>
        <ul className="profile-list">
          <li className="profile-list__item">
            <Link
              onClick={() => this.activeLinkHandler("details")}
              className={`profile-list__item__link ${
                this.state.activeLink == "details" ? activeClass : ""
              }`}
              to="/profile/"
            >
              Details
            </Link>
          </li>
          <li className="profile-list__item">
            <Link
              onClick={() => this.activeLinkHandler("orders")}
              className={`profile-list__item__link ${
                this.state.activeLink == "orders" ? activeClass : ""
              }`}
              to="/profile/orders"
            >
              Shopping History
            </Link>
          </li>
          <li className="profile-list__item">
            <Link
              onClick={() => this.activeLinkHandler("reset")}
              className={`profile-list__item__link ${
                this.state.activeLink == "reset" ? activeClass : ""
              }`}
              to="/profile/reset"
            >
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
