import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { oauth } from "../config";

import * as actions from "../actions/auth";
import CustomInput from "./CustomInput";

class SignIn extends Component {
  onSubmit = async formData => {
    await this.props.signIn(formData);
    if (!this.props.errorMessage) {
      this.props.history.push("/profile");
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
      <div className="login-page">
        <div className="container">
          <div className="login-page__local">
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
                placeholder="yoursuperpassword"
                component={CustomInput}
              />

              {this.props.errorMessage ? (
                <div className="">{this.props.errorMessage}</div>
              ) : null}

              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </form>
          </div>
          <div className="login-page__social">
            <h3>Or sign in using third-party services</h3>
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
              className=""
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  };
}

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "signin" })
)(SignIn);
