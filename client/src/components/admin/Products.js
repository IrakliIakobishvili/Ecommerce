import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
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

    this.handleReset(); /// Move Inside Axios

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
          {/* <div className="product-search">
            <input
              type="text"
              value={this.state.inputValue}
              onChange={this.updateInputValue}
              onKeyUp={this.searchHandler}
            />
          </div> */}
          {/* <div>{this.state.image ? "YES" : "NO"}</div> */}
          <form className="admin-prod__form" onSubmit={this.hanldeFormSubmit}>
            <ul className="prod-descr-list">
              <li>
                {/* <label htmlFor="name">Name</label> */}
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
                {/* <label htmlFor="category">Category</label> */}
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
                {/* <label htmlFor="quantity">Quantity</label> */}
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
                {/* <label htmlFor="size">size</label> */}
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
                {/* <label htmlFor="energy">energy</label> */}
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
                {/* <label htmlFor="sugar">sugar</label> */}
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
                {/* <label htmlFor="protein">protein</label> */}
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
                {/* <label htmlFor="cholesterol">cholesterol</label> */}
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
                {/* <label htmlFor="price">price</label> */}
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
                {/* <label htmlFor="description">description</label> */}
                <textarea
                  value={this.state.description}
                  onChange={e => this.inputValues(e)}
                  id="description"
                  name="description"
                  placeholder="description"
                />
              </li>
              <li>
                {/* <label htmlFor="image">image</label> */}
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

// function mapStateToProps(state) {
//   return {
//     users: state.admin.users,
//     error: state.admin.error,
//     isLoading: state.admin.isLoading
//   };
// }

export default connect(
  null,
  { addProduct }
)(Products);
