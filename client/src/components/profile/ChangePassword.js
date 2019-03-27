import React from "react";
import "../../styles/changePassword.css";

export const ChangePassword = () => (
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

        <button type="submit" size="lg" block color="success" className="chBTN">
          Save Changes
        </button>
      </form>
    </div>
  </div>
);
