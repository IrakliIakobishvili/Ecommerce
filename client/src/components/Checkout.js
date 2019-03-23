import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addToCart, emptyCart } from "../actions/cart";
import PayPalButton from "./PayPalButton";
// import "../styles/productdetails.css";

class Checkout extends Component {
  //   async componentDidMount() {
  //     this.props.getProductDetails(this.props.match.params.id);
  //   }

  //   cartBtnHandler = productId => {
  //     this.props.isAuth
  //       ? this.props.addToCart(productId, 1)
  //       : this.props.history.push("/signin");
  //   };

  render() {
    const lengthLimiter = num => {
      return Number(num.toFixed(2));
    };
    // const { item } = this.props;
    // const { product } = item;
    console.log("Checkout Start");
    // console.log(this.props.items);
    const { cart } = this.props;
    console.log(cart);
    console.log("Checkout End");
    // let price = 0;
    let subtotal = 0;
    // let quantity = 0;
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
            <button>Checkout</button>
            <br />
            {/* <button>Checkout With Paypal</button> */}
            <PayPalButton
              total={total}
              clearCart={this.props.emptyCart}
              history={this.props.history}
              history={this.props.history}
            />
          </li>
        </ul>
        {/* <div>
          ID: {item._id} | Name: {product.name}
        </div>
        <div className="btns">
          <button>-</button>
          <input disabled type="text" />
          <button>+</button>
        </div> */}
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   isAuth: state.auth.isAuthenticated,
//   details: state.products.details,
//   error: state.products.error,
//   isLoading: state.products.isLoading
// });

function mapStateToProps(state) {
  return {
    cart: state.cart.products
  };
}

export default connect(
  mapStateToProps,
  { addToCart, emptyCart }
)(Checkout);

// export default connect()(Checkout);
