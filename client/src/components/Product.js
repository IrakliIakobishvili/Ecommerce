import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cart";
import { API_URL } from "../config";
import "../styles/product.css";

class Product extends Component {
  state = {
    disabled: false
  };
  componentWillReceiveProps() {
    this.setState({ disabled: false });
    //Works Without this.
  }
  addToCartHandler = product => {
    this.setState({ disabled: true });
    this.props.addToCart(product, 1);
  };
  render() {
    const { product, inCart } = this.props;
    return (
      <div className="product__item">
        <Link className="product__item__link" to={`/product/${product._id}`}>
          <div className="product__item__img-cont">
            <img
              className="product__item__img-cont__img"
              src={API_URL + "/" + product.details.photo}
              alt={product.name}
            />
          </div>
          <div className="product__item__name">
            {product.name}
            <i className="fas fa-hamburger" />
          </div>
        </Link>
        <div className="product__item__bottom">
          <div className="product__item__price">${product.details.price}</div>
          <div className="cart-btn-cont">
            {inCart == "Unauthorized" ? (
              <button>
                <Link className="product__item__bottom__link" to="/signin">
                  <i className="fas fa-cart-plus" />
                  <span>Add To Cart</span>
                </Link>
              </button>
            ) : inCart == "AddtoCart" ? (
              <button
                disabled={this.state.disabled}
                onClick={() => this.addToCartHandler(product._id)}
              >
                <Link className="product__item__bottom__link" to="/">
                  <i className="fas fa-cart-plus" />
                  <span>Add To Cart</span>
                </Link>
              </button>
            ) : inCart == "ViewInCart" ? (
              <button>
                <Link className="product__item__bottom__link" to="/cart">
                  <i className="fas fa-shopping-cart" />
                  <span>View</span>
                </Link>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   cart: state.cart.products
// });

export default connect(
  null,
  { addToCart }
)(Product);
