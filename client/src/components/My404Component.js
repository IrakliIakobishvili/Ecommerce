import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/my404component.css";

export default class My404Component extends Component {
  goBack = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <div className="not-found-page">
        <div className="container">
          <ul className="not-found-page__list">
            <li>
              <h3 className="not-found-page__heading">Oops!</h3>
              <p className="not-found-page__desc">
                The page you requested could not be found.
              </p>
              {/* <Link className="not-found-page__link" to="/">
                go back
              </Link> */}
              <button className="not-found-page__link" onClick={this.goBack}>
                go back
              </button>
            </li>
            <li>
              <img
                src={require("../assets/img/error-404-page.jpg")}
                alt="Page Not Found"
              />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
