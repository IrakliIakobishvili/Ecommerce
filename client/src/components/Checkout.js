import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addToCart, emptyCart } from "../actions/cart";
import { saveOrder } from "../actions/orders";
import PayPalButton from "./PayPalButton";

class Checkout extends Component {
  state = {
    disabled: false
  };
  makeOrderHandler = totalPrice => {
    console.log(this.props.cart);
    this.props.saveOrder(this.props.cart, totalPrice);
  };
  render() {
    const lengthLimiter = num => {
      return Number(num.toFixed(2));
    };
    const { cart, saveOrder } = this.props;
    let subtotal = 0;
    cart.forEach(el => {
      subtotal += el.quantity * el.product.details.price;
    });
    let tax = subtotal * 0.1;
    let total = subtotal + tax;
    subtotal = lengthLimiter(subtotal);
    tax = lengthLimiter(tax);
    total = lengthLimiter(total);
    return (
      <div className="checkout">
        <header className="checkout__heading">
          <span>Checkout Details</span>
          <i className="fas fa-wallet" />
        </header>
        <ul className="checkout__list">
          <li>
            <span>SUBTOTAL:</span>
            <span>
              <i className="fas fa-dollar-sign" />
              {subtotal}
            </span>
          </li>
          <li>
            <span>TAXES:</span>
            <span>
              <i className="fas fa-dollar-sign" />
              {tax}
            </span>
          </li>
          <li className="checkout__list__item checkout__list__item--total">
            <span>TOTAL:</span>
            <span>
              <i className="fas fa-dollar-sign" />
              {total}
            </span>
          </li>
          <li className="checkout__list__item checkout__list__item--buttons">
            <div className="checkout__list__item__options">
              <div />
              <span>Checkout With</span>
            </div>
            <button
              onClick={() => this.makeOrderHandler(total)}
              className="checkout-btn checkout-btn--burger"
            >
              BurgerHuB
            </button>
            <div className="checkout-btn checkout-btn--burger">
              <PayPalButton
                total={total}
                clearCart={this.props.emptyCart}
                history={this.props.history}
                history={this.props.history}
              />
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.products,
    isLoading: state.orders.isLoading
  };
}

export default connect(
  mapStateToProps,
  { addToCart, emptyCart, saveOrder }
)(Checkout);
