import React, { Component } from "react";
import "../styles/contact.css";

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: ""
    };
  }

  handleNameChange = event => {
    this.setState({ firstname: event.target.value }, () => {
      this.validateName();
    });
  };

  handleLastnameChange = event => {
    this.setState({ lastname: event.target.value }, () => {
      this.validateName();
    });
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value }, () => {
      this.validateEmail();
    });
  };

  validateName = () => {
    const { firstname } = this.state;
    this.setState({
      nameError:
        firstname.length > 1 ? null : " "
    });
  };

  validateLastname = () => {
    const { lastname } = this.state;
    this.setState({
      lastnameError:
        lastname.length > 1 ? null : " "
    });
  };

  validateEmail = () => {
    const { email } = this.state;
    this.setState({
      emailError:
        email.length > 7 ? null : " "
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { firstname, lastname, email } = this.state;
    alert(`Your state values: \n 
            firstname: ${firstname} \n 
            lastname: ${lastname} \n 
            email: ${email}`);
  };

  render() {
    return (
      <div className="contact-page">
        <div className="contact-container">
          <div className="contact-content">
            <h2 className="contact-us">Contact Us</h2>

            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="contact-label">
                  Firstname
                </label>
                <input
                  name="name"
                  className={`contact-input ${
                    this.state.nameError ? "is-invalid" : ""
                  }`}
                  id="name"
                  value={this.state.firstname}
                  onChange={this.handleNameChange}
                  onBlur={this.validateName}
                />
                <div className="invalid-feedback">{this.state.nameError}</div>
              </div>

              <div className="form-group">
                <label htmlFor="lastname" className="contact-label">
                  Lastname
                </label>
                <input
                  name="lastname"
                  className={`contact-input ${
                    this.state.lastnameError ? "is-invalid" : ""
                  }`}
                  id="lastname"
                  value={this.state.lastname}
                  onChange={this.handleLastnameChange}
                  onBlur={this.validateLastname}
                />
                <div className="invalid-feedback">
                  {this.state.lastnameError}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="contact-label">
                  Email
                </label>
                <input
                  name="email"
                  className={`contact-input ${
                    this.state.emailError ? "is-invalid" : ""
                  }`}
                  id="email"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  onBlur={this.validateEmail}
                />
                <div className="invalid-feedback">{this.state.emailError}</div>
              </div>

              <label className="contact-label">
                Input text:
                <input type="textarea" name="text" className="contact-input" />
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
