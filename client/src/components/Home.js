import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Product from "./Product";

import { getProducts } from "../actions/products";

class Home extends Component {
  async componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const { products } = this.props;

    const result = products.length ? (
      products.map(product => {
        return <Product key={product._id} product={product} />;
      })
    ) : this.props.isLoading ? (
      <h1>Loading...</h1>
    ) : this.props.error ? (
      <h1>{this.props.error}</h1>
    ) : null;

    return (
      <div className="home-page">
        <div className="container">{result}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products.products,
    error: state.products.error,
    isLoading: state.products.isLoading
  };
}

export default connect(
  mapStateToProps,
  { getProducts }
)(Home);
