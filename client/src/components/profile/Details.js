import React, { Component } from "react";
import { connect } from "react-redux";

import { getProfile } from "../../actions/profile";
import { getCartItems } from "../../actions/cart";

class Details extends Component {
  async componentDidMount() {
    this.props.getProfile();
    this.props.getCartItems();
  }

  render() {
    const { user } = this.props;
    console.log(user);
    const content = Object.keys(user).length ? (
      <>
        <li className="profile__list__item">
          <i className="fas fa-user" />
          {user.firstName}
        </li>
        <li className="profile__list__item">
          <i className="fas fa-user" />
          {user.lastName}
        </li>
        <li className="profile__list__item">
          <i className="fas fa-envelope" />
          {user.email}
        </li>
        {user.birthday ? (
          <li className="profile__list__item">
            <i className="fas fa-calendar-alt" />
            {user.birthday}
          </li>
        ) : null}
        <li className="profile__list__item">
          <i className="fas fa-dollar-sign" />
          {user.balance.toFixed(2)}
        </li>
      </>
    ) : this.props.isLoading ? (
      <div className="loading loading--static">
        <i className="fas fa-spinner" />
      </div>
    ) : this.props.error ? (
      <div className="error error--static">
        <i className="fas fa-plug" />
      </div>
    ) : null;

    return <ul className="profile__list">{content}</ul>;
  }
}

function mapStateToProps(state) {
  return {
    user: state.profile.profile,
    isLoading: state.profile.isLoading,
    error: state.profile.error
  };
}

export default connect(
  mapStateToProps,
  { getProfile, getCartItems }
)(Details);
