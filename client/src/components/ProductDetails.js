import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
import { addToCart } from "../actions/cart";
import { getProductDetails } from "../actions/products";
import { getProductReviews } from "../actions/reviews";
import Reviews from "./Reviews";
import "../styles/productdetails.css";

class Details extends Component {
  state = {
    disabled: false,
    loaded: false
  };
  async componentDidMount() {
    await this.props.getProductDetails(this.props.match.params.id);
    this.setState({ loaded: true });
  }
  loadDetailsAndReviews = () => {
    this.props.getProductDetails(this.props.match.params.id);
    console.log("loadDetailsAndReviews Run");
  };
  cartBtnHandler = productId => {
    if (this.props.isAuth) {
      this.setState({ disabled: true });
      this.props.addToCart(productId, 1);
    } else {
      this.props.history.push("/signin");
    }
  };

  render() {
    const { details, cart, reviews } = this.props;
    const productInCart = cart.filter(el => {
      return el.product._id == this.props.match.params.id;
    });
    const productDetails =
      Object.keys(details).length && this.state.loaded ? (
        <Fragment>
          <div className="img-cont">
            <img
              src={API_URL + "/" + details.details.photo}
              alt={details.name}
            />
          </div>
          <ul className="details-list">
            <h3 className="details-list__heading">{details.name}</h3>
            <li>
              <span>Energy:</span>
              <span>{details.details.energy}</span>
            </li>
            <li>
              <span>Sugar:</span>
              <span>{details.details.sugar}</span>
            </li>
            <li>
              <span>Protein:</span>
              <span>{details.details.protein}</span>
            </li>
            <li>
              <span>Cholesterol:</span>
              <span>{details.details.cholesterol}</span>
            </li>
            <li className="size">
              <span>Size:</span>
              <span>{details.details.size}</span>
            </li>
            <li className="details-list__item details-list__item--description">
              <span>Description:</span>
              <span>{details.details.description}</span>
            </li>
            <li className="details-list__item details-list__item--last">
              <div className="details-price">
                <img src={require("../assets/img/money-bag.svg")} />
                <div className="price_number">${details.details.price}</div>
              </div>
              {productInCart.length ? (
                <button className="cart-btn">
                  <i className="fas fa-cart-plus" />
                  <Link to="/cart">View</Link>
                </button>
              ) : (
                <button
                  disabled={this.state.disabled}
                  className="cart-btn"
                  onClick={() => this.cartBtnHandler(details._id)}
                >
                  <i className="fas fa-cart-plus" />
                  Add to Cart
                </button>
              )}
            </li>
          </ul>
          <Reviews
            productID={this.props.match.params.id}
            history={this.props.history}
          />
        </Fragment>
      ) : this.props.isLoading ? (
        <div className="loading">
          <i className="fas fa-spinner" />
        </div>
      ) : this.props.details == "" ? (
        this.loadDetailsAndReviews()
      ) : this.props.error === true ? (
        <div className="error">
          <i className="fas fa-plug" />
        </div>
      ) : null;

    return (
      <div className="details-page">
        <div className="container">
          <h2 className="details-page__heading">
            <span className="details-page__heading__title">details</span>
            <span className="details-page__heading__hr" />
          </h2>
          <div className="details-cont">{productDetails}</div>
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
  { addToCart, getProductDetails, getProductReviews }
)(Details);
