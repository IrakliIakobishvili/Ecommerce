import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Product from "./Product";
import Categories from "./Categories";
import Filter from "./Filter";
import Search from "./Search";
import "../styles/home.css";

import { getProducts } from "../actions/products";
import { getCartItems } from "../actions/cart";

class Home extends Component {
  async componentDidMount() {
    this.props.getProducts();
    if (this.props.isAuth) {
      console.log("Logged");
      this.props.getCartItems();
    } else {
      console.log("not logged");
    }
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
    ) : (
      <h1>Empty</h1>
    );

    return (
      <div className="home-page">
        <div className="container">
          <div className="left-side">
            <Categories />
            <Filter />
          </div>
          <div className="right-side">
            <Search />
            <div className="products">{result}</div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products.products,
    error: state.products.error,
    isLoading: state.products.isLoading,
    isAuth: state.auth.isAuthenticated
  };
}

export default connect(
  mapStateToProps,
  { getProducts, getCartItems }
)(Home);
