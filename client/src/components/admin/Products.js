import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Search from "./searchProduct";
import "../../styles/admin/products.css";

import { addProduct } from "./../../actions/admin";

const initialState = {
  name: "",
  category: "",
  quantity: "",
  size: "",
  energy: "",
  sugar: "",
  protein: "",
  cholesterol: "",
  // totalfat: "",
  // saturatedfat: "",
  // transfat: "",
  // dietaryfibre: "",
  // sodium: "",
  // servingsize: "",
  price: "",
  description: "",
  image: ""
  // empty: ""
};
class Products extends Component {
  state = { ...initialState };
  handleReset = () => {
    this.setState(initialState);
  };

  hanldeFormSubmit = event => {
    event.preventDefault();
    const data = new FormData();

    let values = Object.values(this.state);
    let keys = Object.keys(this.state);
    keys.forEach((el, i) => {
      data.append(el, values[i]);
    });

    this.props.addProduct(data);
  };
  inputValues = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  inputFileValue = e => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };
  render() {
    return (
      <div className="admin-products">
        <div className="container">
          <Search />
          <form className="admin-prod__form" onSubmit={this.hanldeFormSubmit}>
            <ul className="prod-descr-list">
              <li>
                <input
                  value={this.state.name}
                  onChange={e => this.inputValues(e)}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="name"
                />
              </li>
              <li>
                <input
                  value={this.state.category}
                  onChange={e => this.inputValues(e)}
                  type="text"
                  id="category"
                  name="category"
                  placeholder="category"
                />
              </li>
              <li>
                <input
                  value={this.state.quantity}
                  onChange={e => this.inputValues(e)}
                  type="number"
                  id="quantity"
                  name="quantity"
                  placeholder="quantity"
                />
              </li>
              <li>
                <input
                  value={this.state.size}
                  onChange={e => this.inputValues(e)}
                  type="text"
                  id="size"
                  name="size"
                  placeholder="size"
                />
              </li>
              <li>
                <input
                  value={this.state.energy}
                  onChange={e => this.inputValues(e)}
                  type="text"
                  id="energy"
                  name="energy"
                  placeholder="energy"
                />
              </li>
              <li>
                <input
                  value={this.state.sugar}
                  onChange={e => this.inputValues(e)}
                  type="text"
                  id="sugar"
                  name="sugar"
                  placeholder="sugar"
                />
              </li>
              <li>
                <input
                  value={this.state.protein}
                  onChange={e => this.inputValues(e)}
                  type="text"
                  id="protein"
                  name="protein"
                  placeholder="protein"
                />
              </li>
              <li>
                <input
                  value={this.state.cholesterol}
                  onChange={e => this.inputValues(e)}
                  type="text"
                  id="cholesterol"
                  name="cholesterol"
                  placeholder="cholesterol"
                />
              </li>
              <li>
                <input
                  value={this.state.price}
                  onChange={e => this.inputValues(e)}
                  type="number"
                  id="price"
                  name="price"
                  placeholder="price"
                />
              </li>
              <li>
                <textarea
                  value={this.state.description}
                  onChange={e => this.inputValues(e)}
                  id="description"
                  name="description"
                  placeholder="description"
                />
              </li>
              <li>
                <input
                  onChange={e => this.inputFileValue(e)}
                  type="file"
                  id="image"
                  name="image"
                />
              </li>
              <li>
                <button type="submit">Add The Product</button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addProduct }
)(Products);
