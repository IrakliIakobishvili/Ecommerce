import React, { Component, Fragment } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import classNames from "classnames";
import "../styles/categories.css";

import { getCategories, detectActiveLink } from "../actions/categories";
import { getProducts, getProductsByCat } from "../actions/products";

class Categories extends Component {
  async componentDidMount() {
    this.props.getCategories();
    // this.props.getProducts();
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   // return nextProps.isLoading !== this.props.isLoading;
  // }
  componentWillReceiveProps() {
    // console.log("ppp");
    // console.log(this.props.active);
  }
  linkClick = cat => {
    // this.props.setLoadingTrue();
    this.props.getProductsByCat(cat);
    this.props.detectActiveLink(cat);
  };
  render() {
    const { categories } = this.props;

    const result = categories.length ? (
      categories.map(category => {
        return (
          <li key={category._id} className="categories__list__item">
            {/* <NavLink activeClass="active" to={`${category.categoryID}`}>
              {category.title}
            </NavLink> */}
            <Link to="/" onClick={() => this.linkClick(category.categoryID)}>
              {category.title}
            </Link>
          </li>
        );
      })
    ) : this.props.isLoading ? (
      <h5>Loading...</h5>
    ) : this.props.error ? (
      <h1>{this.props.error}</h1>
    ) : null;

    return (
      <nav className="categories">
        <h3>Category</h3>
        <ul className="categories_list">{result}</ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories.categories,
    error: state.categories.error,
    isLoading: state.categories.isLoading,
    active: state.categories.active
  };
}

export default connect(
  mapStateToProps,
  {
    getCategories,
    getProducts,
    getProductsByCat,
    detectActiveLink
  }
)(withRouter(Categories));
