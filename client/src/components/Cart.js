import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { addToCart } from "../actions/cart";

class Cart extends Component {
  render() {
    return (
      <div className="cart-page">
        <div className="container">
          <h1>Cart Page</h1>
          Total item: {this.props.cart.length}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.products
  };
}

export default connect(
  mapStateToProps,
  { addToCart }
)(Cart);
