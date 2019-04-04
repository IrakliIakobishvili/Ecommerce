import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { Link } from "react-router-dom";
import { oauth } from "../config";
import * as actions from "../actions/auth";
import { ActiveHeaderLink } from "../actions/activeLinks";
import CustomInput from "./CustomInput";
import "../styles/auth.css";

class SignIn extends Component {
  onSubmit = async formData => {
    await this.props.signIn(formData);
    if (!this.props.errorMessage) {
      this.props.history.push("/profile");
    }
    setTimeout(() => {
      this.props.clearFeedback();
    }, 3000);
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

  componentWillUnmount = () => {
    this.props.clearFeedback();
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="auth-page">
        <div className="container">
          <div className="auth-form">
            <div className="signin-img auth-form__left">
              <Link
                onClick={() => this.props.ActiveHeaderLink("signup-link")}
                className="member-link"
                to="/signup"
              >
                Create an account
              </Link>
            </div>
            <div className="auth-form__left">
              <h2 className="auth-heading">Sign In</h2>
              <form
                className="auth_form"
                onSubmit={handleSubmit(this.onSubmit)}
              >
                <div className="input-cont">
                  <i className="fas fa-envelope" />
                  <Field
                    name="email"
                    type="text"
                    id="email"
                    placeholder="Your Email"
                    component={CustomInput}
                  />
                </div>
                <div className="input-cont">
                  <i className="fas fa-lock" />
                  <Field
                    name="password"
                    type="password"
                    id="password"
                    placeholder="Your Password"
                    component={CustomInput}
                  />
                </div>

                {this.props.errorMessage ? (
                  <div className="auth_error">{this.props.errorMessage}</div>
                ) : null}

                <div className="agreement">
                  <div className="chackbox">
                    <input id="agree" type="checkbox" defaultChecked />
                  </div>
                  <span>Remember me</span>
                </div>
                <button type="submit" className="auth-btn">
                  Sign In
                </button>

                <div className="login-page__social">
                  <span className="desc">Or login with</span>
                  <FacebookLogin
                    appId={oauth.facebook.clientID}
                    textButton=""
                    fields="name,email,picture"
                    callback={this.responseFacebook}
                    cssClass="facebook-btn"
                    icon="fab fa-facebook-f"
                  />
                  <GoogleLogin
                    clientId={oauth.google.clientID}
                    buttonText=""
                    render={renderProps => (
                      <button
                        className="google-btn"
                        onClick={renderProps.onClick}
                      >
                        <i className="fab fa-google" />
                      </button>
                    )}
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.loginError
  };
}

export default compose(
  connect(
    mapStateToProps,
    { ...actions, ActiveHeaderLink }
  ),
  reduxForm({ form: "signin" })
)(SignIn);
