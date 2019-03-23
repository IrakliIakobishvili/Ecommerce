import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addToCart, removeItemFromCart } from "../actions/cart";
import { Link } from "react-router-dom";
// import "../styles/productdetails.css";

class CartItem extends Component {
  componentWillReceiveProps() {
    this.setState({ disabled: false });
  }

  state = {
    disabled: false
  };
  increment = product => {
    this.setState({ disabled: true });
    this.props.addToCart(product, 1);
  };
  decrement = (product, quantity) => {
    this.setState({ disabled: true });
    if (quantity > 1) {
      this.props.addToCart(product, -1);
    }
  };
  removeItem = product => {
    this.props.removeItemFromCart(product);
  };

  render() {
    const { item } = this.props;
    const { product } = item;
    const { details } = product;
    return (
      <div className="cart__item">
        <div className="cart__item__content">
          {/* ID: {product._id} | Name: {product.name} */}
          <div className="cart__item__product">
            <div className="cart__item__product-img-cont">
              <img src={details.photo} alt={product.name} />
            </div>
            <div>
              <div className="cart__item__title">
                <Link
                  className="cart__item__link"
                  target="_blank"
                  to={`/product/${product._id}`}
                >
                  {product.name}
                </Link>
              </div>
              <div className="cart__item__description">
                {details.description}
              </div>
            </div>
          </div>
          <div className="cart__item__price">
            {details.price}
            <span className="currency">
              <i className="fas fa-dollar-sign" />
            </span>
          </div>
          {/* <div className="cart__item__quantity">{item.quantity}</div> */}
          <div className="cart__item__btns">
            <div className="quantity-btns">
              <button
                disabled={this.state.disabled}
                onClick={() => this.decrement(product._id, item.quantity)}
              >
                <i className="fas fa-minus" />
              </button>
              <input
                ref="cartInput"
                disabled
                value={item.quantity}
                type="text"
              />
              <button
                disabled={this.state.disabled}
                onClick={() => this.increment(product._id)}
              >
                <i className="fas fa-plus" />
              </button>
            </div>
          </div>
          <div className="remove-btn-cont">
            <button
              className="remove-btn"
              onClick={() => this.removeItem(item._id)}
            >
              <i className="fas fa-trash" />
            </button>
          </div>
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
