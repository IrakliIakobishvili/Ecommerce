import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="profile-page-nav">
      <h3 className="profile-page-nav__heading">SETTINGS</h3>
      <ul className="profile-list">
        <li className="profile-list__item">
          <Link className="profile-list__item__link" to="/profile/">
            Details
          </Link>
        </li>
        <li className="profile-list__item">
          <Link className="profile-list__item__link" to="/profile/orders">
            Shopping History
          </Link>
        </li>
        <li className="profile-list__item">
          <Link className="profile-list__item__link" to="/profile/reset">
            Reset Password
          </Link>
        </li>
      </ul>
    </nav>
  );
}
