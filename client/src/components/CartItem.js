import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addToCart, removeItemFromCart } from "../actions/cart";
// import "../styles/productdetails.css";

class CartItem extends Component {
  //   async componentDidMount() {
  //     this.props.getProductDetails(this.props.match.params.id);
  //   }

  //   cartBtnHandler = productId => {
  //     this.props.isAuth
  //       ? this.props.addToCart(productId, 1)
  //       : this.props.history.push("/signin");
  //   };

  increment = product => {
    this.props.addToCart(product, 1);
  };
  decrement = product => {
    this.props.addToCart(product, -1);
  };
  removeItem = product => {
    this.props.removeItemFromCart(product);
  };

  render() {
    const { item } = this.props;
    const { product } = item;
    return (
      <div className="cart__item">
        <div className="cart__item__content">
          ID: {product._id} | Name: {product.name}
        </div>
        <div className="cart__item__btns">
          <div className="quantity-btns">
            <button onClick={() => this.decrement(product._id)}>-</button>
            <input disabled value={item.quantity} type="text" />
            <button onClick={() => this.increment(product._id)}>+</button>
          </div>
          <button
            className="remove-btn"
            onClick={() => this.removeItem(item._id)}
          >
            Remove
          </button>
        </div>
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

export default connect(
  null,
  { addToCart, removeItemFromCart }
)(CartItem);

// export default connect()(CartItem);
