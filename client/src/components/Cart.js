import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";

import { addToCart, getCartItems, emptyCart } from "../actions/cart";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import "../styles/cart.css";

class Cart extends Component {
  async componentDidMount() {
    this.props.getCartItems();
  }
  emptyCartHandler = () => {
    this.props.emptyCart();
  };
  render() {
    const { cart, isLoading, error, response } = this.props;
    console.log("response", response);

    const items = cart.length ? (
      cart.map(product => {
        return <CartItem key={product._id} item={product} />;
      })
    ) : isLoading ? (
      <div className="loading loading--cart">
        <i className="fas fa-spinner" />
      </div>
    ) : error ? (
      <div className="error">
        <i className="fas fa-plug" />
      </div>
    ) : (
      <div className="empty">
        <i className="far fa-meh" />
      </div>
    );

    return (
      <div className="cart-page">
        <div className="container">
          {/* Total item: {this.props.cart.length} */}
          {/* <br /> */}
          <div className="items-cont">
            <header className="cart-page__header">
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>
                <button
                  onClick={() => this.emptyCartHandler()}
                  className="clear-cart-btn"
                >
                  Clear Cart
                </button>
              </div>
            </header>
            {items}
          </div>
          <div className="checkout-cont">
            <Checkout history={this.props.history} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.products,
    isLoading: state.cart.isLoading,
    error: state.cart.error,
    response: state.orders.response
  };
}

export default connect(
  mapStateToProps,
  { addToCart, getCartItems, emptyCart }
)(Cart);
