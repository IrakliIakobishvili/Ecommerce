import React, { Component } from "react";
import axios from "axios";

class CreateProduct extends Component {
  state = {};

  hanldeFormSubmit = event => {
    event.preventDefault();
    const data = new FormData();
    data.append(`${event.target.name}`, event.target.title.value);

    axios({
      method: "post",
      url: "http://localhost:3000/product/create",
      data: data,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(response) {
        console.log(response);
      });
  };
  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.hanldeFormSubmit}>
          <div >
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="name"
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="category"
            />
          </div>

          <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="quantity"
            />
          </div>
          <div>
            <label htmlFor="details">Details:</label>
            <label htmlFor="ingredients">Ingredients</label>
            <input
              type="text"
              id="ingredients"
              name="ingredients"
              placeholder="ingredients"
            />
            <label htmlFor="price">price</label>
            <input
              type="text"
              id="price"
              name="price"
              placeholder="price"
            />
            <label htmlFor="calories">Total Calories</label>
            <input
              type="text"
              id="calories"
              name="calories"
              placeholder="calories"
            />
          </div>
          <div>
            <label htmlFor="productImage">Image</label>
            <input name="productImage" type="file" />
          </div>

          <div>
            <button type="submit" >
              Add The Product
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default CreateProduct;
