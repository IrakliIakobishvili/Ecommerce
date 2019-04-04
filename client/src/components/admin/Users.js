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
  };
  submitHandler = e => {
    e.preventDefault();
    this.props.updateUser(this.state);
  };
  render() {
    const { users } = this.props;
    const result = users.length ? (
      users.map((user, i) => {
        return (
          <li key={user.id} className="user__list__item">
            <span>{++i}</span>
            <Link to="/" onClick={e => this.updateHandler(e, user)} user={user}>
              {user.firstName + " " + user.lastName}
            </Link>
            {user.method === "facebook" ? (
              <i className="fab fa-facebook-f" />
            ) : user.method === "google" ? (
              <i className="fab fa-google" />
            ) : null}
          </li>
        );
      })
    ) : this.props.isLoading ? null : this.props.error ? (
      <div className="error error--static">
        <i className="fas fa-plug" />
      </div>
    ) : !users.length ? (
      <div className="empty--static">
        <i className="far fa-meh" />
      </div>
    ) : null;

    return (
      <div className="admin-users">
        <div className="container">
          <Search />
          <form className="admin-users__form" onSubmit={this.submitHandler}>
            <div>
              <i className="fas fa-user" />
              <input
                value={this.state.firstName}
                onChange={e => this.inputValues(e)}
                name="firstName"
                placeholder="First Name"
              />
            </div>
            <div>
              <i className="fas fa-user" />
              <input
                value={this.state.lastName}
                onChange={e => this.inputValues(e)}
                name="lastName"
                placeholder="Last Name"
              />
            </div>
            <div>
              <i className="fas fa-envelope" />
              <input
                value={this.state.email}
                onChange={e => this.inputValues(e)}
                name="email"
                placeholder="Email"
              />
            </div>
            <div>
              <i className="fas fa-dollar-sign" />
              <input
                value={this.state.balance}
                onChange={e => this.inputValues(e)}
                name="balance"
                placeholder="Balance"
              />
            </div>
            <div>
              <i className="fas fa-check" />
              <input
                value={this.state.verified}
                onChange={e => this.inputValues(e)}
                name="verified"
                placeholder="Verified"
              />
            </div>
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
