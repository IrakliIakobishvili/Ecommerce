import React, { Component } from "react";
import { connect } from "react-redux";
// import "../styles/search.css";
import { getProductsByTitle, getProducts } from "../actions/products";
import { clearActiveLinks } from "../actions/activeLinks";

class Search extends Component {
  state = {
    inputValue: ""
  };
  updateInputValue(e) {
    this.setState({
      inputValue: e.target.value
    });
  }
  render() {
    return (
      <div className="search">
        <input
          value={this.state.inputValue}
          onKeyDown={this.props.clearActiveLinks}
          onChange={e => this.updateInputValue(e)}
          placeholder="Search Product"
          onKeyUp={() => {
            return this.state.inputValue
              ? this.props.getProductsByTitle(this.state.inputValue)
              : this.props.getProducts();
          }}
          className="search__input"
          type="text"
        />
      </div>
    );
  }
}

export default connect(
  null,
  { getProductsByTitle, getProducts, clearActiveLinks }
)(Search);
