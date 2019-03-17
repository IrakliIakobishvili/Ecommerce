import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { oauth } from "../config";

import * as actions from "../actions/auth";
import CustomInput from "./CustomInput";

class SignUp extends Component {
  onSubmit = async formData => {
    await this.props.signUp(formData);
    if (!this.props.errorMessage) {
      // this.props.history.push("/profile");
      console.log("this.props.errorMessage is empty");
    } else if (this.props.successMessage) {
      console.log(this.props.successMessage); /////////// Please Verify Your Email
    }
  };

  responseGoogle = async res => {
    await this.props.oauthGoogle(res.accessToken);
    if (!this.props.errorMessage) {
      this.props.history.push("/profile");
    }
  };

  responseFacebook = async res => {
    await this.props.oauthFacebook(res.accessToken);
    if (!this.props.errorMessage) {
      this.props.history.push("/profile");
    }
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="signup-page">
        <div className="container">
          <div className="signup-page__local">
            <form onSubmit={handleSubmit(this.onSubmit)}>
              <Field
                name="email"
                type="text"
                id="email"
                label="Enter your email"
                placeholder="example@example.com"
                component={CustomInput}
              />
              <Field
                name="password"
                type="password"
                id="password"
                label="Enter your password"
                placeholder="Password"
                component={CustomInput}
              />
              <Field
                name="firstName"
                type="text"
                id="firstName"
                label="Enter your First Name"
                placeholder="First Name"
                component={CustomInput}
              />
              <Field
                name="lastName"
                type="text"
                id="lastName"
                label="Enter your Last Name"
                placeholder="Last Name"
                component={CustomInput}
              />
              <Field
                name="age"
                type="text"
                id="age"
                label="Enter your age"
                placeholder="Age"
                component={CustomInput}
              />
              <Field
                name="birthday"
                type="text"
                id="birthday"
                label="Enter your birthday"
                placeholder="Birthday"
                component={CustomInput}
              />
              <Field
                name="phone"
                type="text"
                id="phone"
                label="Enter your phone"
                placeholder="Phone"
                component={CustomInput}
              />

              {this.props.errorMessage ? (
                <div className="">{this.props.errorMessage}</div>
              ) : this.props.successMessage ? (
                <div className="">{this.props.successMessage}</div>
              ) : null}

              <button type="submit" className="">
                Sign Up
              </button>
            </form>
          </div>
          <div className="signup-page__social">
            <div className="">
              <div className="">Or sign up using third-party services</div>
              <FacebookLogin
                appId={oauth.facebook.clientID}
                textButton="Facebook"
                fields="name,email,picture"
                callback={this.responseFacebook}
                cssClass=""
              />
              <GoogleLogin
                clientId={oauth.google.clientID}
                buttonText="Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                className="xx"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.registerError,
    successMessage: state.auth.success
  };
}

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "signup" })
)(SignUp);
