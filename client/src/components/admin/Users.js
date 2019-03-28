import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Search from "./Search";
import { getUsersByTitle } from "../../actions/admin";

class Users extends Component {
  targetUser = (e, user) => {
    e.preventDefault();
    let currentUser = user;
    console.log(currentUser);
  };
  render() {
    const { users } = this.props;
    console.log(users);
    const result = users.length ? (
      users.map(user => {
        return (
          <li key={user.id} className="user__list__item">
            <Link to="/" onClick={e => this.targetUser(e, user)} user={user}>
              {user.firstName + " " + user.lastName}
            </Link>
          </li>
        );
      })
    ) : this.props.isLoading ? (
      <h5>Loading...</h5>
    ) : this.props.error ? (
      <h1>{this.props.error}</h1>
    ) : null;

    return (
      <div className="admin-users">
        <div className="container">
          <h2>USERS</h2>
          <Search />
          <form>
            <input name="firstName" />
            <br />
            <input name="lastName" />
            <button>Update</button>
          </form>
          <ul className="users-list">{result}</ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.admin.users,
    error: state.admin.error,
    isLoading: state.admin.isLoading
  };
}

export default connect(
  mapStateToProps,
  { getUsersByTitle }
)(Users);
