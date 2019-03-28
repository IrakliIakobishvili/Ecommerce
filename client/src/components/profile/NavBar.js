import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../../styles/navBar.css";

const Sep = () => <span> | </span>;

export const NavBar = () => {
  return (
    <div className="container profile-nav-conteiner">
      <Link className="profile-item-link" to="/change_password">
        Change Password
      </Link>{" "}
      <Sep />
      <Link className="profile-item-link" to="/my_orders">
        My Orders
      </Link>{" "}
      <Sep />
      {/* <Link className="profile-item-link" to="/balance">
        BurgerHub balance
      </Link>{" "}
      <Sep /> */}
      <Link className="profile-item-link" to="/balance">
        BurgerHub balance
      </Link>
      <hr />
    </div>
  );
};
