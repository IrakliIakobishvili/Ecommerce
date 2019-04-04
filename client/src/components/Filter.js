import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "../styles/filter.css";
import { getFilteredProducts, getProducts } from "../actions/products";

class Filter extends Component {
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
    }
  };
  inputValues = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  filterClearHandler = () => {
    this.setState({ lt: "", gt: "" });
    this.props.getProducts();
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
          </div>
        </div>
      </form>
    );
  }
}

export default connect(
  null,
  { getFilteredProducts, getProducts }
)(Filter);
