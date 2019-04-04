import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "../styles/categories.css";

import { getCategories } from "../actions/categories";
import { detectActiveLink } from "../actions/activeLinks";
import { getProducts, getProductsByCat } from "../actions/products";

class Categories extends Component {
  async componentDidMount() {
    this.props.getCategories();
  }
  linkClick = cat => {
    this.props.getProductsByCat(cat);
    this.props.detectActiveLink(cat);
  };
  render() {
    const { categories, activeLink } = this.props;
    const result = categories.length ? (
      categories.map(category => {
        return (
          <li key={category._id} className="categories__list__item">
            <Link
              className={
                activeLink == category.categoryID ? "active-cat" : null
              }
              to="/"
              onClick={() => this.linkClick(category.categoryID)}
            >
              {category.title}
            </Link>
          </li>
        );
      })
    ) : this.props.isLoading ? (
      <div className="loading loading--static">
        <i className="fas fa-spinner" />
      </div>
    ) : this.props.error === true ? (
      <div className="error error--static">
        <i className="fas fa-plug" />
      </div>
    ) : null;

    return (
      <nav className="categories">
        <h3 className="categories__heading">CATEGORIES</h3>
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
    activeLink: state.activeLinks.catNav
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
