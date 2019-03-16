import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfile } from "../actions/profile";

class Profile extends Component {
  async componentDidMount() {
    this.props.getProfile();
  }

  render() {
    const { profileContent } = this.props;
    const content = Object.keys(profileContent).length ? (
      <p>{profileContent}</p>
    ) : this.props.isLoading ? (
      <h1>Loading...</h1>
    ) : this.props.error ? (
      <h1>{this.props.error}</h1>
    ) : null;

    return (
      <div className="profile-page">
        <div className="container">
          <h1>Profile Page</h1>
          {content}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profileContent: state.profile.profile,
    isLoading: state.profile.isLoading,
    error: state.profile.error
  };
}

export default connect(
  mapStateToProps,
  { getProfile }
)(Profile);
