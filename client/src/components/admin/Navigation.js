import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/admin/navigation.css";

export default class Navigation extends Component {
  state = {
    activeLink: ""
  };

  activeLinkHandler = async className => {
    await this.setState({ activeLink: className });
  };
  render() {
    return (
      <nav className="admin-page-nav">
        <h3 className="admin-page-nav__heading ">SETTINGS</h3>
        <ul>
          <li className="admin-list__item">
            <Link
              onClick={() => this.activeLinkHandler("users")}
              className={`admin-list__item__link ${
                this.state.activeLink == "users" ? "active-admin" : ""
              }`}
              to="/admin/users"
            >
              Users
            </Link>
          </li>
          <li className="admin-list__item">
            <Link
              onClick={() => this.activeLinkHandler("products")}
              className={`admin-list__item__link ${
                this.state.activeLink == "products" ? "active-admin" : ""
              }`}
              to="/admin/products"
            >
              Products
            </Link>
          </li>
          <li className="admin-list__item">
            <Link
              onClick={() => this.activeLinkHandler("categories")}
              className={`admin-list__item__link ${
                this.state.activeLink == "categories" ? "active-admin" : ""
              }`}
              to="/admin/categories"
            >
              Categories
            </Link>
          </li>
          <li className="admin-list__item">
            <Link
              onClick={() => this.activeLinkHandler("contacts")}
              className={`admin-list__item__link ${
                this.state.activeLink == "contacts" ? "active-admin" : ""
              }`}
              to="/admin/contacts"
            >
              Contacts
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
