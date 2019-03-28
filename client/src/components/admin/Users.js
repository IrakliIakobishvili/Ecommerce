import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Search from "./Search";
import { getUsersByTitle } from "../../actions/admin";

class Users extends Component {
  state = {
    firstName:'',
    lastName:'',
    email:'',
    balance:'',
    verified: '',
    method:''
  }
  targetUser = (e, user) => {
    e.preventDefault();
    if(user.method !== 'local') {
      console.log("Can't Update!")
      this.setState({firstName:'',
      lastName:'',
      email:'',
      balance:'',
      verified: '',
      method:''});
    }else {
      this.setState({id:user.id,firstName:user.firstName,lastName:user.lastName,email:user.email,balance:user.balance,verified:user.verified,method:user.method})
    }
  };
  inputValues = (e) => {
    this.setState({[e.target.name]:e.target.value});
    console.log(this.state)
  }
  submitHandler = (e) => {
    e.preventDefault()
    console.log(this.state)
  }
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
          <form onSubmit={this.submitHandler}>
            <input value={this.state.firstName} onChange={(e)=>this.inputValues(e)} name="firstName" placeholder='First Name' />
            <br />
            <input value={this.state.lastName} onChange={(e)=>this.inputValues(e)} name="lastName" placeholder='Last Name'/>
            <br />
            <input value={this.state.email} onChange={(e)=>this.inputValues(e)} name="email" placeholder='Email'/>
            <br />
            <input value={this.state.balance} onChange={(e)=>this.inputValues(e)} name="balance" placeholder='Balance'/>
            <br />
            <input value={this.state.verified} onChange={(e)=>this.inputValues(e)} name="verified" placeholder='Verified'/>
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
