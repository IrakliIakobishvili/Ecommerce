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
  filterSubmitHandler = e => {
    e.preventDefault();
  };
  render() {
    return (
      <form className="filter_form" onSubmit={this.filterSubmitHandler}>
        <h3 className="filter_heading">Filter</h3>
        <div className="filter">
          <div className="filter__price">
            <input
              id="priceFrom"
              type="text"
              name="priceFrom"
              placeholder="From"
            />
            <input id="priceTo" type="text" name="priceTo" placeholder="To" />
            <i className="fas fa-dollar-sign" />
          </div>
          <div className="filter_button_cont">
            <button className="filter_button">SEARCH</button>
            {/* <i className="fas fa-hamburger" /> */}
            {/* <span>5 </span> */}
          </div>
        </div>
      </form>
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
