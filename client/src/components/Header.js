import React, { Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import {signIn,signUp,oauthFacebook,oauthGoogle,signOut} from "../actions/auth";
import * as authActions from "../actions/auth";
import { ActiveHeaderLink, clearActiveLinks } from "../actions/activeLinks";
import { getCategories } from "../actions/categories";
import { getProducts } from "../actions/products";
import { getCartItems } from "../actions/cart";
import "../styles/header.css";

class Header extends Component {
  // checkAuth() {
  //   if (!this.props.isAuth) {
  //     this.props.history.push("/");
  //   }
  // }

  // componentDidUpdate() {
  //   this.checkAuth();
  // }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return false;
  // }
  // async componentDidMount() {
  //   this.props.getCategories();
  //   this.props.getProducts();
  //   // console.log(this.props);
  // }
  componentDidMount() {
    if (this.props.isAuth) {
      console.log("Logged");
      this.props.getCartItems();
    } else {
      console.log("not logged");
    }
  }
  reloadCatAndProds = async className => {
    // this.props.getCategories();
    // this.props.getProducts();
    this.props.clearActiveLinks();
    this.detectActiveLink(className);
    // console.log("ss");
  };

  signOut = () => {
    this.props.signOut();
    // console.log(this.props);
  };

  detectActiveLink = className => {
    // console.log(className);
    this.props.ActiveHeaderLink(className);
  };

  render() {
    const { activeLink } = this.props;
    return (
      <header className="main-header">
        <div className="container">
          {/* <div className="logo">
            <Link
              // className={`logo-link ${activeLink == "logo-link" ? null : null}`}
              onClick={() => this.reloadCatAndProds("logo-link")}
              to="/"
            >
              <img src={require("../assets/img/logo.svg")} height="62px" />
              <h1 className="logo__heading">BURGER HUB</h1>
            </Link>
          </div> */}
          <div className="logo">
            <Link onClick={() => this.reloadCatAndProds("logo-link")} to="/">
              <img
                className="logo__img"
                src={require("../assets/img/hamburguer.svg")}
                height="62px"
              />
              <h1 className="logo__heading_2">Burger HuB</h1>
            </Link>
          </div>
          <div className="header-list">
            <ul className="my-account">
              <li className="nav-item">
                {/* <i className="fas fa-user" /> */}
                <Link
                  // className="profile-link"
                  // className={`contact-link ${
                  //   activeLink == "profile-link" ? "active-top" : null
                  // }`}

                  // {!this.props.isAuth ? (
                  //   <span>jj</span>
                  // ): (
                  //   <span>s</span>
                  // )
                  // }
                  onClick={
                    this.props.isAuth
                      ? () => this.detectActiveLink("profile-link")
                      : () => this.detectActiveLink("")
                  }
                  // onClick={() => this.detectActiveLink("profile-link")}
                  className={`profile-link ${
                    activeLink == "profile-link" ? "active-top" : null
                  }`}
                  to="/profile"
                >
                  {/* My Account */}
                  <i className="fas fa-user-circle" />
                  {/* <span className="profile-span"> */}
                  {/* <i className="fas fa-user" /> */}
                  {/* <i className="far fa-user" /> */}
                  {/* </span> */}
                </Link>
              </li>
            </ul>
            <ul className="contact-list">
              <li className="nav-item">
                {/* <i className="fas fa-envelope" /> */}
                <Link
                  onClick={() => this.detectActiveLink("contact-link")}
                  className={`contact-link ${
                    activeLink == "contact-link" ? "active-top" : null
                  }`}
                  to="/contact"
                >
                  {/* <span className="profile-span"> */}
                  <i className="fas fa-envelope" />
                  {/* <i className="far fa-envelope" /> */}
                  {/* </span> */}
                  {/* Contact */}
                </Link>
              </li>
            </ul>
            <span className="separator">|</span>,
            <ul className="auth-list">
              {/* <i className="fas fa-user" /> */}
              <i className="fas fa-sign-in-alt" />
              {!this.props.isAuth
                ? [
                    <li className="nav-item" key="signin">
                      <Link
                        onClick={() => this.detectActiveLink("signin-link")}
                        className={`signin-link ${
                          activeLink == "signin-link" ? "active-top" : null
                        }`}
                        to="/signin"
                      >
                        Sign In
                      </Link>
                    </li>,
                    <span key="divider">/</span>,
                    <li className="" key="signup">
                      <Link
                        onClick={() => this.detectActiveLink("signup-link")}
                        className={`signup-link ${
                          activeLink == "signup-link" ? "active-top" : null
                        }`}
                        to="/signup"
                      >
                        Sign Up
                      </Link>
                    </li>
                  ]
                : null}

              {this.props.isAuth
                ? [
                    <li key="logout" className="nav-item">
                      <Link
                        className="nav-link"
                        to="/"
                        onClick={() => {
                          this.signOut();
                          this.props.clearActiveLinks();
                        }}
                      >
                        {/* Sign Out */}
                        <span className="sign-out-span" />
                      </Link>
                    </li>,
                    <li key="cart" style={{ color: "active-top" }}>
                      <Link
                        onClick={() => this.detectActiveLink("cart-link")}
                        to="/cart"
                        className="cart-link"
                        // className={`cart-link ${
                        //   activeLink == "cart-link" ? "red" : null
                        // }`}
                      >
                        <span className="cart-count">
                          {this.props.cart.length}
                        </span>
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
    cart: state.cart.products,
    activeLink: state.activeLinks.topNav
  };
}

export default connect(
  mapStateToProps,
  {
    ...authActions,
    getCategories,
    getProducts,
    getCartItems,
    ActiveHeaderLink,
    clearActiveLinks
  }
)(Header);
