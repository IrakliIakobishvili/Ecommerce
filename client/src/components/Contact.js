import React, { Component } from "react";
import { connect } from "react-redux";
import { saveContact, clearFeedback } from "../actions/contact";
import "../styles/contact.css";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  message: ""
};
class Contact extends Component {
  state = {
    ...initialState
  };
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
      this.props.saveContact(this.state);
      this.setState({ ...initialState });
    }
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  resetState = () => {
    this.setState(initialState);
  };
  componentWillReceiveProps() {
    setTimeout(() => {
      this.props.clearFeedback();
    }, 3000);
  }

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
                  id="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName" className="contact-label">
                  Lastname
                </label>
                <input
                  name="lastName"
                  className={`contact-input ${
                    this.state.lastName ? "is-valid" : ""
                  }`}
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
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
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>

              <label className="contact-label">
                <textarea
                  onChange={this.handleChange}
                  style={{ resize: "none", height: "60px" }}
                  value={this.state.message}
                  placeholder="Message"
                  className={`contact-input ${
                    this.state.message ? "is-valid" : ""
                  }`}
                  name="message"
                />
              </label>
              <button type="submit" className="contact-btn">
                Send Your Message
              </button>
              <div className="contact-feedback">{this.props.feedback}</div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    // products: state.products.products,
    feedback: state.contact.feedback
  };
}

export default connect(
  mapStateToProps,
  { saveContact, clearFeedback }
)(Contact);
