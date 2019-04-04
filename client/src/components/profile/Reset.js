import React, { Component } from "react";
import "../../styles/reset.css";

export default class ChangePassword extends Component {
  render() {
    return (
      <div className="chForm-conteiner">
        <div className="chform-change-password">
          <h2>Change password</h2>
          <span className="chPassword-span">
            It's a good idea to use a strong password that you're not using
            elsewhere
          </span>
          <form className="">
            <input
              name="currentPassword"
              type="password"
              placeholder="Current Password"
              required="required"
              className="chform-control"
            />
            <input
              name="newPassword"
              type="password"
              placeholder="New Password"
              required="required"
              className="chform-control"
            />
            <input
              name="newPasswordRepeated"
              type="password"
              placeholder="New Password Repeated"
              required="required"
              className="chform-control"
            />
            <button type="submit" className="chBTN">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    );
  }
}
