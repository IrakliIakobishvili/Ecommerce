import React from "react";
import { Link } from "react-router-dom";


export const MyOrders = () => {
  return (
    <div className="cart-page">
      <div className="container">
        <div className="items-cont">
          <header className="cart-page__header">
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>
              <button
                onClick={() => this.emptyCartHandler()}
                className="clear-cart-btn"
              >
                Clear Cart
              </button>
            </div>
          </header>
        </div>
      </div>
    </div>
  );
};

export const ProductView = ({ match }) => {
  return (
    <div>
      <h3>khatia</h3>
    </div>
  );
};
