import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { oauth } from "../config";

import * as actions from "../actions/auth";
import CustomInput from "./CustomInput";
import "../styles/signup.css";

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
          <div className="signup-form">
            <div className="signup-form__left">
              <h2 className="signup-heading">Sign Up</h2>
              <div className="signup-page__local">
                <form onSubmit={handleSubmit(this.onSubmit)}>
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
                      <i class="fas fa-calendar-alt" />
                      <Field
                        name="day"
                        type="text"
                        id="day"
                        placeholder="Day"
                        component={CustomInput}
                      />
                    </div>
                    <div className="input-cont">
                      <i class="fas fa-calendar-alt" />
                      <Field
                        name="month"
                        type="text"
                        id="month"
                        placeholder="Month"
                        component={CustomInput}
                      />
                    </div>
                    <div className="input-cont">
                      <i class="fas fa-calendar-alt" />
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
                    <div className="">{this.props.errorMessage}</div>
                  ) : this.props.successMessage ? (
                    <div className="">{this.props.successMessage}</div>
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
                  <button type="submit" className="register-btn">
                    Register
                  </button>
                </form>
              </div>
            </div>
            <div className="signup-form__right">
              <Link className="member-link" to="/signin">
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
    actions
  ),
  reduxForm({ form: "signup" })
)(SignUp);
