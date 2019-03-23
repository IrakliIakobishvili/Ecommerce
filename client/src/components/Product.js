// import React from "react";
// import { Link } from "react-router-dom";
// import "../styles/product.css";

// export default function Product({ product, inCart, addToCart }) {
//   console.log(inCart);
//   return (
//     <div className="product__item">
//       <Link to={`/product/${product._id}`}>
//         <div>{product.name}</div>
//       </Link>
//       <div>{product.details.os}</div>
//       <div>{product.details.cpu}</div>
//       <div>{product.details.ram}</div>
//       <div className="cart-btn-cont">
//         {inCart == "Unauthorized" ? (
//           <button>
//             <Link to="/signin">Add To Cart</Link>
//           </button>
//         ) : inCart == "AddtoCart" ? (
//           <button onClick={() => addToCart(product._id, 1)}>
//             Add To Cart
//             {/* <Link to="/cart">Add To Cart</Link> */}
//           </button>
//         ) : inCart == "ViewInCart" ? (
//           <button>
//             <Link to="/cart">{inCart}</Link>
//           </button>
//         ) : null}
//       </div>
//     </div>
//   );
// }

//////////
/////////
////////
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../actions/cart";
import "../styles/product.css";

class Product extends Component {
  state = {
    disabled: false
  };
  componentWillReceiveProps() {
    this.setState({ disabled: false });
    //Works Without this.
  }
  addToCartHandler = product => {
    this.setState({ disabled: true });
    this.props.addToCart(product, 1);
  };
  render() {
    const { product, inCart } = this.props;
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
            <button
              disabled={this.state.disabled}
              onClick={() => this.addToCartHandler(product._id)}
            >
              Add To Cart
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
}

// const mapStateToProps = state => ({
//   cart: state.cart.products
// });

export default connect(
  null,
  { addToCart }
)(Product);
