import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// import { addToCart } from "../actions/cart";
// import "../styles/productdetails.css";

class Checkout extends Component {
  //   async componentDidMount() {
  //     this.props.getProductDetails(this.props.match.params.id);
  //   }

  //   cartBtnHandler = productId => {
  //     this.props.isAuth
  //       ? this.props.addToCart(productId, 1)
  //       : this.props.history.push("/signin");
  //   };

  render() {
    // const { item } = this.props;
    // const { product } = item;
    return (
      <div className="checkout">
        <div>checkout section</div>
        {/* <div>
          ID: {item._id} | Name: {product.name}
        </div>
        <div className="btns">
          <button>-</button>
          <input disabled type="text" />
          <button>+</button>
        </div> */}
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   isAuth: state.auth.isAuthenticated,
//   details: state.products.details,
//   error: state.products.error,
//   isLoading: state.products.isLoading
// });

// export default connect(
//   mapStateToProps,
//   { addToCart, getProductDetails }
// )(Movie);

export default connect()(Checkout);
