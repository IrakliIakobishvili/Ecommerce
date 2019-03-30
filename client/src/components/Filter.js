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
      <form onSubmit={this.filterSubmitHandler}>
        <h3>Filter</h3>
        <ul className="filter">
          <h4>Energy</h4>
          <li>
            <div>
              <input id="energy1" type="checkbox" name="energy" />
              <label htmlFor="energy1">From 1000 to 2000</label>
            </div>
            <div>
              <input id="energy2" type="checkbox" name="energy" />
              <label htmlFor="energy2">Less than 1000</label>
            </div>
            <div>
              <input id="energy3" type="checkbox" name="energy" />
              <label htmlFor="energy3">More than 2000</label>
            </div>
          </li>
          <h4>Protein</h4>
          <li>
            <div>
              <input id="protein1" type="checkbox" name="energy" />
              <label htmlFor="protein1">From 20 to 30</label>
            </div>
            <div>
              <input id="protein2" type="checkbox" name="energy" />
              <label htmlFor="protein2">Less than 20</label>
            </div>
            <div>
              <input id="protein3" type="checkbox" name="energy" />
              <label htmlFor="protein3">More than 30</label>
            </div>
          </li>
          <h4>Price</h4>
          <li>
            <div>
              <input
                id="priceFrom"
                type="text"
                name="priceFrom"
                placeholder="From"
              />
              <input id="priceTo" type="text" name="priceTo" placeholder="To" />
            </div>
          </li>
        </ul>
        <button>SEARCH</button>
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
