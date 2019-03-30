import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/admin/navigation.css";

export default class Navigation extends Component {
  render() {
    return (
      <nav className="admin-page-nav">
        <h3 className="admin-page-nav__heading ">SETTINGS</h3>
        <ul>
          <li className="admin-list__item">
            <Link className="admin-list__item__link" to="/admin/users">
              Users
            </Link>
          </li>
          <li className="admin-list__item">
            <Link className="admin-list__item__link" to="/admin/products">
              Products
            </Link>
          </li>
          <li className="admin-list__item">
            <Link className="admin-list__item__link" to="/admin/categories">
              Categories
            </Link>
          </li>
          <li className="admin-list__item">
            <Link className="admin-list__item__link" to="/admin/contacts">
              Contacts
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
