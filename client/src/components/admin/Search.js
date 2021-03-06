import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsersByTitle, getUsers } from "../../actions/admin";

class Search extends Component {
  state = {
    inputValue: ""
  };
  updateInputValue = e => {
    this.setState({
      inputValue: e.target.value
    });
  };
  usersSearchHandler = () => {
    if (this.state.inputValue) {
      this.props.getUsersByTitle(this.state.inputValue);
    } else {
      this.props.getUsers();
    }
  };
  render() {
    return (
      <div className="search">
        <input
          value={this.state.inputValue}
          onKeyDown={this.props.clearActiveLinks}
          onChange={e => this.updateInputValue(e)}
          onKeyUp={() => this.usersSearchHandler()}
          placeholder="Search User"
          className="search__input"
          type="text"
        />
      </div>
    );
  }
}

export default connect(
  null,
  { getUsersByTitle, getUsers }
)(Search);
