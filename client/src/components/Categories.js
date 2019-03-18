import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../styles/categories.css";

import { getCategories } from "../actions/categories";

class Categories extends Component {
  async componentDidMount() {
    this.props.getCategories();
  }
  render() {
    const { categories } = this.props;

    const result = categories.length ? (
      categories.map(category => {
        return (
          <li key={category._id} className="categories__list__item">
            {/* <Link to={`/category/${category.categoryID}`}>{category.title}</Link> */}
            <Link to="/">{category.title}</Link>
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
        <ul className="categories_list">{result}</ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories.categories,
    error: state.categories.error,
    isLoading: state.categories.isLoading
  };
}

export default connect(
  mapStateToProps,
  { getCategories }
)(Categories);
