import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// import _ from "lodash";
// import { Redirect } from "react-router-dom";
import { addToCart } from "../actions/cart";
import { getProductDetails } from "../actions/products";

import Categories from "./Categories";

class Movie extends Component {
  async componentDidMount() {
    this.props.getProductDetails(this.props.match.params.id);
  }

  render() {
    // const result = products.length ? (
    //   products.map(product => {
    //     return <Product key={product._id} product={product} />;
    //   })
    // ) : this.props.isLoading ? (
    //   <h1>Loading...</h1>
    // ) : this.props.error ? (
    //   <h1>{this.props.error}</h1>
    // ) : null;

    const { details } = this.props;
    const productDetails = Object.keys(details).length ? (
      <Fragment>
        <div className="img-cont">
          <img src={details.details.photo} alt={details.name} />
        </div>
        <ul>
          <li>Name: {details.name}</li>
          <li>Category: {details.category}</li>

          {this.props.isAuth ? (
            <button onClick={() => this.props.addToCart(details._id)}>
              Add to Cart
            </button>
          ) : null}

          <li>
            {/* <button
              onClick={() => this.props.addToCart(details._id)}
            >
              Add to Cart
            </button> */}
          </li>
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
          <Categories />
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
  isLoading: state.products.isLoading
});

export default connect(
  mapStateToProps,
  { addToCart, getProductDetails }
)(Movie);
