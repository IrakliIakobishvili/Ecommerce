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
    this.props.getCategories();
    this.props.getProducts();
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
            <ul className="">
              <li className="nav-item">
                <Link className="" to="/profile">
                  Profile
                </Link>
              </li>
            </ul>

            <ul className="">
              <li className="nav-item">
                <Link
                  onClick={() => this.detectActiveLink("contact-link")}
                  className={`contact-link ${
                    activeLink == "contact-link" ? "red" : null
                  }`}
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>

            <ul className="auth-list">
              {!this.props.isAuth
                ? [
                    <li className="" key="signup">
                      <Link
                        onClick={() => this.detectActiveLink("signup-link")}
                        className={`signup-link ${
                          activeLink == "signup-link" ? "red" : null
                        }`}
                        to="/signup"
                      >
                        Sign Up
                      </Link>
                    </li>,
                    <li className="nav-item" key="signin">
                      <Link
                        onClick={() => this.detectActiveLink("signin-link")}
                        className={`signin-link ${
                          activeLink == "signin-link" ? "red" : null
                        }`}
                        to="/signin"
                      >
                        Sign In
                      </Link>
                    </li>
                  ]
                : null}

              {this.props.isAuth
                ? [
                    <li key="cart" style={{ color: "red" }}>
                      <Link
                        onClick={() => this.detectActiveLink("cart-link")}
                        to="/cart"
                        className={`cart-link ${
                          activeLink == "cart-link" ? "red" : null
                        }`}
                      >
                        Total: {this.props.cart.length}
                      </Link>
                    </li>,
                    <li key="logout" className="nav-item">
                      <Link
                        className="nav-link"
                        to="/"
                        onClick={() => {
                          this.signOut();
                          this.props.clearActiveLinks();
                        }}
                      >
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
