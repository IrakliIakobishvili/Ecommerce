import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { oauth } from "../config";

import * as actions from "../actions/auth";
import { ActiveHeaderLink } from "../actions/activeLinks";
import CustomInput from "./CustomInput";
import "../styles/auth.css";

class SignUp extends Component {
  onSubmit = async formData => {
    await this.props.signUp(formData);
    if (!this.props.errorMessage) {
      // this.props.history.push("/profile");
      console.log("this.props.errorMessage is empty");
    } else if (this.props.successMessage) {
      console.log(this.props.successMessage); /////////// Please Verify Your Email
      // this.props.clearFeedback();
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
            <div className="auth-form__left">
              <h2 className="auth-heading">Sign Up</h2>
              <div className="auth-page__local">
                <form
                  className="auth_form"
                  onSubmit={handleSubmit(this.onSubmit)}
                >
                  <div className="input-cont">
                    <i className="fas fa-user" />
                    <Field
                      name="firstName"
                      type="text"
                      id="firstName"
                      placeholder="First Name"
                      component={CustomInput}
                    />
                  </div>
                  <div className="input-cont">
                    <i className="fas fa-user" />
                    <Field
                      name="lastName"
                      type="text"
                      id="lastName"
                      placeholder="Last Name"
                      component={CustomInput}
                    />
                  </div>
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
                      placeholder="Password"
                      component={CustomInput}
                    />
                  </div>
                  {/* <div className="input-cont">
                    <i className="fas fa-lock" />
                    <Field
                      name="password"
                      type="password"
                      id="password"
                      placeholder="Confirm Password"
                      component={CustomInput}
                    />
                  </div> */}
                  <div className="input-cont">
                    <i className="fas fa-phone" />
                    <Field
                      name="phone"
                      type="text"
                      id="phone"
                      placeholder="Phone"
                      component={CustomInput}
                    />
                  </div>
                  <div className="dates">
                    <div className="input-cont">
                      <i className="fas fa-calendar-alt" />
                      <Field
                        name="day"
                        type="text"
                        id="day"
                        placeholder="Day"
                        component={CustomInput}
                      />
                    </div>
                    <div className="input-cont">
                      <i className="fas fa-calendar-alt" />
                      <Field
                        name="month"
                        type="text"
                        id="month"
                        placeholder="Month"
                        component={CustomInput}
                      />
                    </div>
                    <div className="input-cont">
                      <i className="fas fa-calendar-alt" />
                      <Field
                        name="year"
                        type="text"
                        id="year"
                        placeholder="Year"
                        component={CustomInput}
                      />
                    </div>
                  </div>
                  {this.props.errorMessage ? (
                    <div className="auth_error auth_error--signup">
                      {this.props.errorMessage}
                    </div>
                  ) : this.props.successMessage ? (
                    <div className="auth_success">
                      {this.props.successMessage}
                    </div>
                  ) : null}

                  <div className="agreement">
                    <div className="chackbox">
                      <input id="agree" type="checkbox" defaultChecked />
                      <label htmlFor="agree" />
                    </div>
                    <span>
                      I agree all statements in <a href="#">Terms of service</a>
                    </span>
                  </div>
                  <button type="submit" className="auth-btn">
                    Register
                  </button>
                </form>
              </div>
            </div>
            <div className="auth-form__right signup-img">
              <Link
                onClick={() => this.props.ActiveHeaderLink("signin-link")}
                className="member-link"
                to="/signin"
              >
                I am already member
              </Link>
            </div>
          </div>

          {/* <div className="signup-page__social">
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
          </div> */}
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
    { ...actions, ActiveHeaderLink }
    // ActiveHeaderLink
    // { ...actions },
    // ActiveHeaderLink
  ),
  reduxForm({ form: "signup" })
)(SignUp);
