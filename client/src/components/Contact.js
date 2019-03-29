import React, { Component } from "react";
import "../styles/contact.css";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  message: ""
};
export default class Contact extends Component {
  state = {
    ...initialState
  };
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     firstname: "",
  //     lastname: "",
  //     email: ""
  //   };
  // }

  // handleNameChange = event => {
  //   this.setState({ firstname: event.target.value }, () => {
  //     this.validateName();
  //   });
  // };

  // handleLastnameChange = event => {
  //   this.setState({ lastname: event.target.value }, () => {
  //     this.validateName();
  //   });
  // };

  // handleEmailChange = event => {
  //   this.setState({ email: event.target.value }, () => {
  //     this.validateEmail();
  //   });
  // };

  // validateName = () => {
  //   const { firstname } = this.state;
  //   this.setState({
  //     nameError:
  //       firstname.length > 1 ? null : " "
  //   });
  // };

  // validateLastname = () => {
  //   const { lastname } = this.state;
  //   this.setState({
  //     lastnameError:
  //       lastname.length > 1 ? null : " "
  //   });
  // };

  // validateEmail = () => {
  //   const { email } = this.state;
  //   this.setState({
  //     emailError:
  //       email.length > 7 ? null : " "
  //   });
  // };

  // handleSubmit = event => {
  //   event.preventDefault();
  //   const { firstname, lastname, email } = this.state;
  //   alert(`Your state values: \n
  //           firstname: ${firstname} \n
  //           lastname: ${lastname} \n
  //           email: ${email}`);
  // };
  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    const keys = Object.keys(this.state);
    const values = Object.values(this.state);

    let emptyFields = 0;
    keys.forEach((el, i) => {
      if (values[i] === "") {
        console.log(el + " is Empty!");
        emptyFields++;
      }
    });
    if (emptyFields) {
      console.log("Fill Al Field");
    } else {
      console.log("Send To DB");
    }
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  resetState = () => {
    this.setState(initialState);
  };

  render() {
    return (
      <div className="contact-page">
        <div className="contact-container">
          <div className="contact-content">
            <h2 className="contact-us">Contact Us</h2>

            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstName" className="contact-label">
                  Firstname
                </label>
                <input
                  name="firstName"
                  className={`contact-input ${
                    this.state.firstName ? "is-valid" : ""
                  }`}
                  // className={`contact-input ${
                  //   this.state.nameError ? "is-invalid" : ""
                  // }`}
                  id="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  // onBlur={this.validateName}
                />
                {/* <div className="invalid-feedback">{this.state.nameError}</div> */}
              </div>

              <div className="form-group">
                <label htmlFor="lastName" className="contact-label">
                  Lastname
                </label>
                <input
                  name="lastName"
                  // className={`contact-input`}
                  className={`contact-input ${
                    this.state.lastName ? "is-valid" : ""
                  }`}
                  // className={`contact-input ${
                  //   this.state.lastnameError ? "is-invalid" : ""
                  // }`}
                  // id="lastname"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  // onBlur={this.validateLastname}
                />
                {/* <div className="invalid-feedback">
                  {this.state.lastnameError}
                </div> */}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="contact-label">
                  Email
                </label>
                <input
                  name="email"
                  className={`contact-input ${
                    this.state.email ? "is-valid" : ""
                  }`}
                  // className={`contact-input ${
                  //   this.state.emailError ? "is-invalid" : ""
                  // }`}
                  // id="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  // onBlur={this.validateEmail}
                />
                {/* <div className="invalid-feedback">{this.state.emailError}</div> */}
              </div>

              <label className="contact-label">
                {/* Input text: */}
                {/* <input
                  value={this.state.message}
                  onChange={this.handleChange}
                  type="textarea"
                  name="message"
                  className="contact-input"
                /> */}
                <textarea
                  onChange={this.handleChange}
                  style={{ resize: "none" }}
                  value={this.state.message}
                  // value={}
                  // onChange={this.handleChange}
                  className={`contact-input ${
                    this.state.message ? "is-valid" : ""
                  }`}
                  name="message"
                />
              </label>
              <button type="submit" className="contact-btn">
                Send Your Message
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
