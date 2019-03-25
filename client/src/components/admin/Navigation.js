import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class Navigation extends Component {
  render() {
    return (
      <nav>
        <ul>
            <li><Link to='/admin/users'>Users</Link></li>
            <li><Link to='/admin/products'>Products</Link></li>
        </ul>
      </nav>
    )
  }
}
