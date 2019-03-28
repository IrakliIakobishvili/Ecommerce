import React, { Component } from "react";
import { connect } from "react-redux";

import { getOrder } from "../../actions/profile";

class Orders extends Component {
  async componentDidMount() {
    this.props.getOrder();
    // this.props.getCartItems();
  }
  render() {
    const { order } = this.props;
    const content = order.length ? (
      <p>{order.length}</p>
    ) : this.props.error ? (
      <h1>{this.props.error}</h1>
    ) : this.props.isLoading ? (
      <h3>Loading...</h3>
    ) : order.length === 0 ? (
      <h2>Empty</h2>
    ) : null;

    // const content = order.length ? (
    //   <p>{order.length}</p>
    // ) : this.props.error ? (
    //   <h1>{this.props.error}</h1>
    // ) : order.length === 0 ? (
    //   <h2>Empty</h2>
    // ) : this.props.isLoading ? (
    //   <h3>Loading...</h3>
    // ) : null;

    return <div style={{ height: "100%" }}>{content}</div>;
  }
}

function mapStateToProps(state) {
  return {
    order: state.profile.order,
    isLoading: state.profile.isLoading,
    error: state.profile.error
  };
}

export default connect(
  mapStateToProps,
  { getOrder }
)(Orders);
