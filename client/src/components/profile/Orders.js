import React, { Component } from "react";
import { connect } from "react-redux";

import { getOrder } from "../../actions/profile";

class Orders extends Component {
  async componentDidMount() {
    this.props.getOrder();
  }
  render() {
    const { order } = this.props;
    let i = 0;
    const content = order.length ? (
      order.map(el => {
        return el.map(e => {
          return (
            <li key={i++}>
              <div>
                <img
                  src={el[0].product.details.photo}
                  alt={el[0].product.name}
                />
              </div>
              <div>{el[0].product.name}</div>
              <div>{el[0].product.details.price}</div>
              <div>{el[0].quantity}</div>
              <ul>
                <li>{el[0].product.details.cholesterol}</li>
                <li>{el[0].product.details.size}</li>
                <li>{el[0].product.details.cholesterol}</li>
                <li>{el[0].product.details.dietaryfibre}</li>
                <li>{el[0].product.details.energy}</li>
                <li>{el[0].product.details.protein}</li>
                <li>{el[0].product.details.sugar}</li>
              </ul>
            </li>
          );
        });
      })
    ) : this.props.error ? (
      <h1>{this.props.error}</h1>
    ) : this.props.isLoading ? (
      <h3>Loading...</h3>
    ) : order.length === 0 ? (
      <h2>Empty</h2>
    ) : null;

    return <ul style={{ maxHeight: "500px" }}>{content}</ul>;
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
