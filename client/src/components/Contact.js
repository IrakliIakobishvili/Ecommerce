import React, { Component } from "react";
import "../styles/contact.css";

export default class Contact extends Component {
  state = {
    show: false,
    message: null,
    notSend: "Please check your email!",
    formControls: {
      title: "",
      text: "",
      name: "",
      surname: "",
      email: ""
    }
  };
  
  onChange = event => {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;
    const formControls = { ...this.state.formControls };
    formControls[name] = value;
    if (name == 'email') {
      if (this.validateEmail(value)) {
        this.state.message = 'Your message has been sent succesfully!';
      } else {
        this.state.message = this.state.notSend;
      }
    }
    
    this.setState({ formControls });
  };
  
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  validate() {
    var result = "#result";
    var email = "#email".val();
    result.text("");

    if (this.validateEmail(email)) {
      result.text(email + " is valid :)");
      result.css("color", "green");
    } else {
      result.text(email + " is not valid :(");
      result.css("color", "red");
    }
    return false;
  }



  render() {
    return (
      <div className="contact-page">
        <div className="contact-container">
          <div className="contact-content">
            <h2 className="contact-us">Contact Us</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <label className="contact-label">
                firstName:
                <input type="text" name="firstName" className="contact-input"
                onChange={event => this.onChange(event)}
                 />
              </label>

              <label className="contact-label">
                lastName:
                <input type="text" name="lastName" className="contact-input"
                onChange={event => this.onChange(event)} 
                />
              </label>

              <label className="contact-label">
                email:
                <input type="text" name="email" className="contact-input" 
                onChange={event => this.onChange(event)}
                />
              </label>

              <label className="contact-label">
                input text:
                <input type="textarea" name="text" className="contact-input" 
                onChange={event => this.onChange(event)}
                />
              </label>

              <button
                className="contact-btn"
                type="submit"
                onClick={() => this.setState({ show: true })}
              >
                Send Your Message
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
