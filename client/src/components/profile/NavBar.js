import React, { Component } from "react";
import { Link } from "react-router-dom";

const Sep = () => <span> | </span>;

export const NavBar = () => {
  return (
    <div>
      <Link to="/change_password">Change Password</Link> <Sep />
      <Link to="/my_orders">My Orders</Link> <Sep />
      <Link to="/another">Another</Link> <Sep />
      <Link to="/nested">Nested</Link>
      <hr />
    </div>
  );
};
