import React, { Component } from "react";
import "../styles/contact.css";

export default class Contact extends Component {
  render() {
    return (
      <div className="contact-page">
        <div className="contact-container">
          <div className="contact-content">
          <h2 className="contact-us">Contact Us</h2>
            <form>
              <label>
                firstName:
                <input type="text" name="firstName" />
              </label>

              <label>
                lastName:
                <input type="text" name="lastName" />
              </label>

              <label>
                email:
                <input type="text" name="email" />
              </label>

              <label>
                input text:
                <input type="text" name="text" />
              </label>

              <button className="contact-btn" type="submit">Send Your Message</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
