import React from "react";
import { Link } from "react-router-dom";
import "../styles/product.css";

export default function Product({ product }) {
  return (
    <div className="product__item">
      <Link to={`/product/${product._id}`}>
        <div>{product.name}</div>
      </Link>
      <div>{product.details.os}</div>
      <div>{product.details.cpu}</div>
      <div>{product.details.ram}</div>
    </div>
  );
}
