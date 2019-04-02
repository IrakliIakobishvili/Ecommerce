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
  state = {
    lt: "",
    gt: ""
  };
  filterSubmitHandler = e => {
    e.preventDefault();
    let params = {
      lt: Number(this.state.lt),
      gt: Number(this.state.gt)
    };
    if (this.state.lt && this.state.gt) {
      this.props.getFilteredProducts(params);
      console.log(params);
    }
  };
  inputValues = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form className="filter_form" onSubmit={this.filterSubmitHandler}>
        <h3 className="filter_heading">Filter</h3>
        <div className="filter">
          <div className="filter__price">
            <input
              value={this.state.gt}
              onChange={e => this.inputValues(e)}
              id="priceFrom"
              type="number"
              name="gt"
              placeholder="From"
            />
            <input
              value={this.state.lt}
              onChange={e => this.inputValues(e)}
              id="priceTo"
              type="number"
              name="lt"
              placeholder="To"
            />
            <i className="fas fa-dollar-sign" />
          </div>
          <div className="filter_button_cont">
            <button className="filter_button">SEARCH</button>
            {this.state.lt && this.state.gt ? (
              <span onClick={this.filterClearHandler} className="filter_clear">
                clear
              </span>
            ) : null}
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
