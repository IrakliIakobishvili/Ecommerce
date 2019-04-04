import React, { Component } from "react";
import { connect } from "react-redux";

import { getProductsByTitle } from "../../actions/admin";

class Search extends Component {
  state = {
    inputValue: ""
  };
  updateInputValue = e => {
    this.setState({
      inputValue: e.target.value
    });
  };
  productsSearchHandler = () => {
    if (this.state.inputValue) {
      this.props.getProductsByTitle(this.state.inputValue);
    } else {
    }
  };
  render() {
    return (
      <div className="search">
        <input
          value={this.state.inputValue}
          onKeyDown={this.props.clearActiveLinks}
          onChange={e => this.updateInputValue(e)}
          onKeyUp={() => this.productsSearchHandler()}
          placeholder="Search Product"
          className="search__input"
          type="text"
        />
      </div>
    );
  }
}

export default connect(
  null,
  { getProductsByTitle }
)(Search);
