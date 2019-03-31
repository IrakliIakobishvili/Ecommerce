import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Search from "./Search";
import { getUsersByTitle, updateUser } from "../../actions/admin";
import "../../styles/admin/users.css";

class Users extends Component {
  state = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    balance: "",
    verified: "",
    method: "",
    day: "",
    month: "",
    year: "",
    phone: ""
  };
  updateHandler = (e, user) => {
    e.preventDefault();
    if (user.method !== "local") {
      console.log("Can't Update!");
      this.setState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        balance: "",
        verified: "",
        method: "",
        day: "",
        month: "",
        year: "",
        phone: ""
      });
    } else {
      this.setState({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        balance: user.balance,
        verified: user.verified,
        method: user.method,
        day: user.day,
        month: user.month,
        year: user.year
      });
    }
  };
  inputValues = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };
  submitHandler = e => {
    e.preventDefault();
    console.log("STATE START");
    console.log(this.state);
    // console.log(this.state)
    // const modifiedUser =
    this.props.updateUser(this.state);
  };
  render() {
    const { users } = this.props;
    console.log(users);
    const result = users.length ? (
      users.map((user, i) => {
        return (
          <li key={user.id} className="user__list__item">
            {/* <div> */}
            <span>{++i}</span>
            {/* </div> */}
            <Link to="/" onClick={e => this.updateHandler(e, user)} user={user}>
              {user.firstName + " " + user.lastName}
            </Link>
            {user.method === "facebook" ? (
              <i className="fab fa-facebook-f" />
            ) : user.method === "google" ? (
              <i className="fab fa-google" />
            ) : null}
            {/* <span>{user.method}</span> */}
          </li>
        );
      })
    ) : this.props.isLoading ? null : this.props.error ? ( // </div> //   <i className="fas fa-spinner" /> // <div className="loading">
      <div className="error error--static">
        <i className="fas fa-plug" />
      </div>
    ) : null;

    return (
      <div className="admin-users">
        <div className="container">
          {/* <h2>USERS</h2> */}
          <Search />
          <form className="admin-users__form" onSubmit={this.submitHandler}>
            <input
              value={this.state.firstName}
              onChange={e => this.inputValues(e)}
              name="firstName"
              placeholder="First Name"
            />
            <input
              value={this.state.lastName}
              onChange={e => this.inputValues(e)}
              name="lastName"
              placeholder="Last Name"
            />
            <input
              value={this.state.email}
              onChange={e => this.inputValues(e)}
              name="email"
              placeholder="Email"
            />
            <input
              value={this.state.balance}
              onChange={e => this.inputValues(e)}
              name="balance"
              placeholder="Balance"
            />
            <input
              value={this.state.verified}
              onChange={e => this.inputValues(e)}
              name="verified"
              placeholder="Verified"
            />
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
  { getUsersByTitle, updateUser }
)(Users);
