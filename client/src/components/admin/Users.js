import React, { Component } from 'react'
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import Search from "./Search";
import {getUsersByTitle} from '../../actions/admin';

class Users extends Component {
  targetUser =(e,user) => {
    e.preventDefault();
    let currentUser = user;
    console.log(currentUser)
  }
  render() {
    const {users} = this.props;
    console.log(users)
    const result = users.length ? (
      users.map(user => {
        // let method = user.method == 'local' ? 
        let method = '';
        switch (user.method) {
          case 'local':
            method = 'local'
            break;
          case 'google':
            method = 'google'
            break;
          case 'facebook':
            method = 'facebook'
            break;
        } 
        // console.log(user)
        return (
          <li key={user._id} className="user__list__item">
            {/* <Link to="/" onClick={(e) => this.targetUser(e,user[method])} user={user[method]}>
              {user[method].firstName +' '+ user[method].lastName}
            </Link>  */}
          </li>
        );
      })
    ) : this.props.isLoading ? (
      <h5>Loading...</h5>
    ) : this.props.error ? (
      <h1>{this.props.error}</h1>
    ) : null;






    return (
      <div className='admin-users'>
        <div className='container'>
        <h2>USERS</h2> 
        <Search />
        <form>
            <input name='firstName' /><br/>
            <input name='lastName' />
            <button>Update</button>
        </form>
        <ul className='users-list'>
            {result}
        </ul>
        </div>
      </div>
    )
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
    {getUsersByTitle }
  )(Users);
  


// "email":"updated new irakli@gmail.com",
// 	"password":"iiii",
// 	"firstName":"ramnishvneloba updated 3",
// 	"lastName":"",
// 	"age":"99",
// 	"birthday":"78",
    // "phone":"9"
    