import React, { Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/auth";

class Header extends Component {
  // checkAuth() {
  //   if (!this.props.isAuth) {
  //     this.props.history.push("/");
  //   }
  // }

  // componentDidUpdate() {
  //   this.checkAuth();
  // }

  signOut = () => {
    this.props.signOut();
  };

  render() {
    return (
      <header className="main-header">
        <div className="container">
          <Link className="logo" to="/">
            LOGO
          </Link>

          <div className="">
            <ul className="">
              <li className="nav-item">
                <Link className="" to="/profile">
                  Profile
                </Link>
              </li>
            </ul>

            <ul className="">
              <li className="nav-item">
                <Link className="" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>

            <ul className="auth-list">
              {!this.props.isAuth
                ? [
                    <li className="" key="signup">
                      <Link className="auth-list__link" to="/signup">
                        Sign Up
                      </Link>
                    </li>,
                    <li className="nav-item" key="signin">
                      <NavLink
                        className=""
                        to="/signin"
                        activeClassName="active"
                      >
                        Sign In
                      </NavLink>
                    </li>
                  ]
                : null}

              {this.props.isAuth
                ? [
                    <li key="cart" style={{ color: "red" }}>
                      <Link to="/cart">Total: {this.props.cart.length}</Link>
                    </li>,
                    <li key="logout" className="nav-item">
                      <Link className="nav-link" to="/" onClick={this.signOut}>
                        Sign Out
                      </Link>
                    </li>
                  ]
                : null}
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated,
    cart: state.cart.products
  };
}

export default connect(
  mapStateToProps,
  actions
)(Header);
