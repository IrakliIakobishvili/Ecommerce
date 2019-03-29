import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// import _ from "lodash";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
import { addToCart } from "../actions/cart";
import { getProductDetails } from "../actions/products";
import { getProductReviews } from "../actions/reviews";
import Reviews from "./Reviews";
import "../styles/productdetails.css";

// import Categories from "./Categories";

class Details extends Component {
  state = {
    disabled: false
  };
  componentDidMount() {
    this.props.getProductDetails(this.props.match.params.id);
    // this.props.getProductReviews(this.props.match.params.id);
  }
  loadDetailsAndReviews = () => {
    this.props.getProductDetails(this.props.match.params.id);
    // this.props.getProductReviews(this.props.match.params.id);
    console.log("loadDetailsAndReviews Run");
  };
  // componentWillReceiveProps() {
  //   this.props.getProductDetails(this.props.match.params.id);
  //   this.props.getProductReviews(this.props.match.params.id);
  // }

  cartBtnHandler = productId => {
    // this.props.isAuth
    //   ? this.props.addToCart(productId, 1)
    //   : this.props.history.push("/signin");
    if (this.props.isAuth) {
      this.setState({ disabled: true });
      this.props.addToCart(productId, 1);
    } else {
      this.props.history.push("/signin");
    }
  };

  render() {
    // const totalReviews = this.props.reviews.length ? (
    //   <h2>Are Reviews</h2>
    // ) : (
    //   <h2>No Reviews</h2>
    // );
    // console.log("REVIEW FROM PROD ST");
    // console.log(this.props.reviews);
    // console.log("REVIEW FROM PROD EN");
    const { details, cart, reviews } = this.props;
    const productInCart = cart.filter(el => {
      return el.product._id == this.props.match.params.id;
    });
    const productDetails = Object.keys(details).length ? (
      <Fragment>
        <div className="img-cont">
          <img src={API_URL + "/" + details.details.photo} alt={details.name} />
        </div>
        <ul>
          <li>Name: {details.name}</li>
          <li>Category: {details.category}</li>
          <li>
            {productInCart.length ? (
              <button className="cart-btn">
                <Link to="/cart">View In Cart</Link>
              </button>
            ) : (
              <button
                disabled={this.state.disabled}
                className="cart-btn"
                onClick={() => this.cartBtnHandler(details._id)}
              >
                Add to Cart
              </button>
            )}
          </li>
          {/* <li>{}</li> */}
        </ul>
        {/* <div className="reviews">{totalReviews}</div> */}
      </Fragment>
    ) : this.props.isLoading ? (
      <h1>Loading...</h1>
    ) : this.props.details == "" ? (
      // <h1>CARIELIA</h1>
      this.loadDetailsAndReviews()
    ) : this.props.error ? (
      <h1>{this.props.error}</h1>
    ) : null;

    return (
      <div className="details-page">
        <div className="container">
          <h2 className="details-page__heading">
            <span className="details-page__heading__title">details</span>
            <span className="details-page__heading__hr" />
          </h2>
          <div className="details-cont">{productDetails}</div>
          <Reviews
            productID={this.props.match.params.id}
            history={this.props.history}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated,
  details: state.products.details,
  // reviews: state.products.reviews,
  error: state.products.error,
  isLoading: state.products.isLoading,
  cart: state.cart.products
});

export default connect(
  mapStateToProps,
  { addToCart, getProductDetails, getProductReviews }
)(Details);
