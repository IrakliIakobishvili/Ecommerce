import React, { Component } from "react";
import { connect } from "react-redux";
import { verifyAccount } from "../actions/verify";
import "../styles/verify.css";

class Verify extends Component {
  state = {
    loaded: false
  };
  componentDidMount = async () => {
    await this.props.verifyAccount(this.props.match.params.token);
    this.setState({ loaded: true });
  };

  render() {
    const content =
      this.state.loaded && !this.props.error ? (
        this.props.feedback === "SUCCESS" ? (
          this.props.history.push("/signin")
        ) : (
          <div className="verify-feedback">
            <div className="feedback-text">{this.props.feedback}</div>
            {this.props.feedback === "Your Are Already Verified" ? (
              <img
                src={require("../assets/img/burger_person2.svg")}
                alt="Burger Man"
              />
            ) : (
              <img
                src={require("../assets/img/burger_person1.svg")}
                alt="Burger Man"
              />
            )}
          </div>
        )
      ) : this.props.error ? (
        <div className="error">
          <i className="fas fa-plug" />
        </div>
      ) : (
        <div className="loading">
          <i className="fas fa-spinner" />
        </div>
      );
    return (
      <div className="verify-page">
        <div className="container">{content}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feedback: state.verify.feedback,
  error: state.verify.error
});

export default connect(
  mapStateToProps,
  { verifyAccount }
)(Verify);
