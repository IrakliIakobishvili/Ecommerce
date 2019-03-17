import React from "react";
import { Link } from "react-router-dom";

export default function Product({ product }) {
  return (
    <div
      className="product__item"
      style={{ border: "1px solid green", margin: "5px", padding: "5px" }}
    >
      <Link to={`/product/${product._id}`}>
        <div>{product.name}</div>
      </Link>
      <div>{product.details.os}</div>
      <div>{product.details.cpu}</div>
      <div>{product.details.ram}</div>
    </div>
  );
}
