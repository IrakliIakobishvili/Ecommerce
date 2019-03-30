import React, { Component } from "react";
import axios from "axios";

const initialState = {
  name: "",
  category: "",
  quantity: "",
  size: "",
  energy: "",
  sugar: "",
  protein: "",
  cholesterol: "",
  totalfat: "",
  saturatedfat: "",
  transfat: "",
  dietaryfibre: "",
  sodium: "",
  servingsize: "",
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

    axios({
      method: "post",
      url: "http://localhost:5000/api/products/",
      data: data,
      config: { headers: { "Content-Type": "multpart/form-data" } }
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(response) {
        console.log(response);
      });
  };
  inputValues = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  inputFileValue = e => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };
  render() {
    return (
      <div className="adin-products">
        <div className="container">
          <div>{this.state.image ? "YES" : "NO"}</div>
          <form onSubmit={this.hanldeFormSubmit}>
            <ul>
              <li>
                <label htmlFor="name">Name</label>
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
                <label htmlFor="category">Category</label>
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
                <label htmlFor="quantity">Quantity</label>
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
                <label htmlFor="size">size</label>
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
                <label htmlFor="energy">energy</label>
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
                <label htmlFor="sugar">sugar</label>
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
                <label htmlFor="protein">protein</label>
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
                <label htmlFor="cholesterol">cholesterol</label>
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
                <label htmlFor="totalfat">totalfat</label>
                <input
                  value={this.state.totalfat}
                  onChange={e => this.inputValues(e)}
                  type="text"
                  id="totalfat"
                  name="totalfat"
                  placeholder="totalfat"
                />
              </li>
              <li>
                <label htmlFor="saturatedfat">saturatedfat</label>
                <input
                  value={this.state.saturatedfat}
                  onChange={e => this.inputValues(e)}
                  type="text"
                  id="saturatedfat"
                  name="saturatedfat"
                  placeholder="saturatedfat"
                />
              </li>
              <li>
                <label htmlFor="transfat">transfat</label>
                <input
                  value={this.state.transfat}
                  onChange={e => this.inputValues(e)}
                  type="text"
                  id="transfat"
                  name="transfat"
                  placeholder="transfat"
                />
              </li>
              <li>
                <label htmlFor="dietaryfibre">dietaryfibre</label>
                <input
                  value={this.state.dietaryfibre}
                  onChange={e => this.inputValues(e)}
                  type="text"
                  id="dietaryfibre"
                  name="dietaryfibre"
                  placeholder="dietaryfibre"
                />
              </li>
              <li>
                <label htmlFor="sodium">sodium</label>
                <input
                  value={this.state.sodium}
                  onChange={e => this.inputValues(e)}
                  type="text"
                  id="sodium"
                  name="sodium"
                  placeholder="sodium"
                />
              </li>
              <li>
                <label htmlFor="servingsize">servingsize</label>
                <input
                  value={this.state.servingsize}
                  onChange={e => this.inputValues(e)}
                  type="number"
                  id="servingsize"
                  name="servingsize"
                  placeholder="servingsize"
                />
              </li>
              <li>
                <label htmlFor="price">price</label>
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
                <label htmlFor="description">description</label>
                <textarea
                  value={this.state.description}
                  onChange={e => this.inputValues(e)}
                  id="description"
                  name="description"
                  placeholder="description"
                />
              </li>
              <li>
                <label htmlFor="image">image</label>
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

export default Products;
