import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// import _ from "lodash";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cart";
import { getProductDetails } from "../actions/products";
import "../styles/productdetails.css";

import Categories from "./Categories";

class Movie extends Component {
  async componentDidMount() {
    this.props.getProductDetails(this.props.match.params.id);
  }

  cartBtnHandler = productId => {
    this.props.isAuth
      ? this.props.addToCart(productId, 1)
      : this.props.history.push("/signin");
  };

  render() {
    const { details, cart } = this.props;
    const productInCart = cart.filter(el => {
      return el.product._id == this.props.match.params.id;
    });
    const productDetails = Object.keys(details).length ? (
      <Fragment>
        <div className="img-cont">
          <img src={details.details.photo} alt={details.name} />
        </div>
        <ul>
          <li>Name: {details.name}</li>
          <li>Category: {details.category}</li>
          {productInCart.length ? (
            <button className="cart-btn">
              <Link to="/cart">View In Cart</Link>
            </button>
          ) : (
            <button
              className="cart-btn"
              onClick={() => this.cartBtnHandler(details._id)}
            >
              Add to Cart
            </button>
          )}
          <li />
        </ul>
      </Fragment>
    ) : this.props.isLoading ? (
      <h1>Loading...</h1>
    ) : this.props.error ? (
      <h1>{this.props.error}</h1>
    ) : null;

    return (
      <div className="details-page">
        <div className="container">
          <h1>Details Page</h1>
          {/* <Categories /> */}
          {productDetails}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated,
  details: state.products.details,
  error: state.products.error,
  isLoading: state.products.isLoading,
  cart: state.cart.products
});

export default connect(
  mapStateToProps,
  { addToCart, getProductDetails }
)(Movie);
