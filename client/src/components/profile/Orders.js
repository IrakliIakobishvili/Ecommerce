import React, { Component } from "react";
import { connect } from "react-redux";
import { API_URL } from "../../config";
import { Link } from "react-router-dom";
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
        return el.map(e => {
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
                <Link to={`../product/${e.product._id}`} target="_blank">
                  {e.product.name}
                </Link>
              </div>
              <div>
                <span>Price: </span>
                {e.product.details.price}
              </div>
              <div>
                <span>Quantity: </span>
                {e.quantity}
              </div>
              <div>
                <span>Date: </span>
                {e.product.createdAt.split("T")[0]}
              </div>
              <ul className="order-sub-list">
                <li>
                  <span>Size:</span>
                  {e.product.details.size}
                </li>
                <li>
                  <span>Cholesterol:</span>
                  {e.product.details.cholesterol}
                </li>
                <li>
                  <span>Energy:</span>
                  {e.product.details.energy}
                </li>
                <li>
                  <span>Protein:</span>
                  {e.product.details.protein}
                </li>
                <li>
                  <span>Sugar:</span>
                  {e.product.details.sugar}
                </li>
              </ul>
            </li>
          );
        });
      })
    ) : this.props.error ? (
      <div className="error error--static">
        <i className="fas fa-plug" />
      </div>
    ) : this.props.isLoading ? (
      <div className="loading loading--static">
        <i className="fas fa-spinner" />
      </div>
    ) : order.length === 0 ? (
      <div className="empty empty--static">
        <i className="far fa-meh" />
      </div>
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
