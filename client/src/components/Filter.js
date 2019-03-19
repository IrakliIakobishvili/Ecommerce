import React, { Component, Fragment } from "react";
// import { Link, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "../styles/filter.css";

import { getFilteredProducts } from "../actions/products";

class Filter extends Component {
  //   async componentDidMount() {
  //     // this.props.getCategories();
  //     // this.props.getProducts();
  //   }
  render() {
    return (
      <Fragment>
        <h3>Filter</h3>
        <h4>Operation System</h4>
        <ul className="filter">
          <li>
            <input id="android" type="checkbox" name="android" />
            <label htmlFor="android">Android</label>
          </li>
          <li>
            <input id="ios" type="checkbox" name="ios" />
            <label htmlFor="ios">IOS</label>
          </li>
          <li>
            <input id="linux" type="checkbox" name="linux" />
            <label htmlFor="linux">Linux</label>
          </li>
        </ul>

        <h4>Processor</h4>
        <ul className="filter">
          <li>
            <input id="i7" type="checkbox" name="i7" />
            <label htmlFor="i7">Intel Core i7</label>
          </li>
          <li>
            <input id="i5" type="checkbox" name="i5" />
            <label htmlFor="i5">Intel Core i5</label>
          </li>
          <li>
            <input id="i3" type="checkbox" name="i3" />
            <label htmlFor="linux">Intel Core i3</label>
          </li>
        </ul>
        <button>SEARCH</button>
      </Fragment>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     categories: state.categories.categories,
//     error: state.categories.error,
//     isLoading: state.categories.isLoading,
//     active: state.categories.active
//   };
// }

export default connect(
  null,
  { getFilteredProducts }
)(Filter);
