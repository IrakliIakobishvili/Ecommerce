import React, { Component } from "react";
import { connect } from "react-redux";

import {getUsersByTitle,getUsers} from '../../actions/admin';

class Search extends Component {
  state = {
    inputValue: ""
  };
  updateInputValue =(e) =>{
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
          onKeyUp={()=> console.log('ddd')}
          placeholder="Search User"
          // onKeyUp={() =
            //  this.state.inputValue.length
              //  this.props.getUsersByTitle(this.state.inputValue)
              // : this.props.getUsers();
          // }}
          className="search__input"
          type="text"
        />
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     users: state.admin.users,
//     error: state.admin.error,
//     isLoading: state.admin.isLoading
//   };
// }

export default connect( 
  null,
  {getUsersByTitle,getUsers }
)(Search);
