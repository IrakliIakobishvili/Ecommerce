import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Users from "./Users";
import Products from "./Products";
import Categories from "./Categories";
import Contacts from "./Contacts";
import "../../styles/admin/index.css";

class Admin extends Component {
  render() {
    return (
      <div className="admin-page">
        <BrowserRouter>
          <div className="container">
            <div className="admin-page-wrapper">
              <div className="admin-page-aside">
                <Navigation />
              </div>
              <div className="admin-page-content">
                <Route exact path="/admin/" component={Users} />
                <Route exact path="/admin/users" component={Users} />
                <Route exact path="/admin/products" component={Products} />
                <Route exact path="/admin/categories" component={Categories} />
                <Route exact path="/admin/contacts" component={Contacts} />
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default Admin;
