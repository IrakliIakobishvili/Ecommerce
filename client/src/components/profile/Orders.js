import React, { Component } from "react";
import { connect } from "react-redux";
import { API_URL } from "../../config";
import "../../styles/orders.css";

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
        console.log(el);
        return el.map(e => {
          console.log(e);
          return (
            <li className="order-list__item" key={i++}>
              <div className="order-list__item__img-cont">
                <img
                  src={API_URL + "/" + e.product.details.photo}
                  alt={e.product.name}
                />
              </div>
              <div>
                <span>Name: </span>
                {e.product.name}
              </div>
              <div>
                <span>Price: </span>
                {e.product.details.price}
              </div>
              <div>
                <span>Quantity: </span>
                {e.quantity}
              </div>
              <ul className="order-sub-list">
                {/* <li>{e.product.details.cholesterol}</li> */}
                <li>
                  <span>Size</span>
                  {e.product.details.size}
                </li>
                <li>{e.product.details.cholesterol}</li>
                {/* <li>{e.product.details.dietaryfibre}</li> */}
                <li>
                  <span>Energy</span>
                  {e.product.details.energy}
                </li>
                <li>
                  <span>Protein</span>
                  {e.product.details.protein}
                </li>
                <li>
                  <span>Sugar</span>
                  {e.product.details.sugar}
                </li>
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

    return <ul className="order-list">{content}</ul>;
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
