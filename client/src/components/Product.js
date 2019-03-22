import React from "react";
import { Link } from "react-router-dom";
import "../styles/product.css";

export default function Product({ product, inCart, addToCart }) {
  console.log(inCart);
  return (
    <div className="product__item">
      <Link to={`/product/${product._id}`}>
        <div>{product.name}</div>
      </Link>
      <div>{product.details.os}</div>
      <div>{product.details.cpu}</div>
      <div>{product.details.ram}</div>
      <div className="cart-btn-cont">
        {inCart == "Unauthorized" ? (
          <button>
            <Link to="/signin">Add To Cart</Link>
          </button>
        ) : inCart == "AddtoCart" ? (
          <button onClick={() => addToCart(product._id, 1)}>
            Add To Cart
            {/* <Link to="/cart">Add To Cart</Link> */}
          </button>
        ) : inCart == "ViewInCart" ? (
          <button>
            <Link to="/cart">{inCart}</Link>
          </button>
        ) : null}
      </div>
    </div>
  );
}

// import React, { Component } from 'react'

// class Product extends Component {
//   cartBtnHandler = productId => {
//     this.props.isAuth
//       ? this.props.addToCart(productId, 1)
//       : this.props.history.push("/signin");
//   };
//   render() {
//     return (
//       <div>

//       </div>
//     )
//   }
// }

// const mapStateToProps = state => ({
//   isAuth: state.auth.isAuthenticated
// });

// export default connect(
//   mapStateToProps,
//   { addToCart, getProductDetails }
// )(Product);
