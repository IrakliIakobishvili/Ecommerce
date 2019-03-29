import React, { Component } from "react";
import axios from "axios";

class CreateProduct extends Component {
  state = {};

  hanldeFormSubmit = event => {
    event.preventDefault();
    const data = new FormData();
    // data.append(`${event.target.name}`, event.target.title.value);
    data.append("name", event.target.name.value);
    data.append("category", event.target.category.value);
    data.append("quantity", event.target.quantity.value);
    data.append("size", event.target.size.value);
    data.append("energy", event.target.energy.value);
    data.append("sugar", event.target.sugar.value);
    data.append("protein", event.target.protein.value);
    data.append("cholesterol", event.target.cholesterol.value);
    data.append("totalfat", event.target.totalfat.value);
    data.append("saturatedfat", event.target.saturatedfat.value);
    data.append("transfat", event.target.transfat.value);

    data.append("dietaryfibre", event.target.dietaryfibre.value);
    data.append("sodium", event.target.sodium.value);
    data.append("servingsize", event.target.servingsize.value);
    data.append("price", event.target.price.value);
    data.append("description", event.target.description.value);

    data.append("image", event.target.image.files[0]);
    // console.log(data);

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
  render() {
    return (
      <div className="adin-products">
        <div className="container">
          <form onSubmit={this.hanldeFormSubmit}>
            <ul>
              <li>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="name" />
              </li>
              <li>
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  placeholder="category"
                />
              </li>
              <li>
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  placeholder="quantity"
                />
              </li>
              <li>
                <label htmlFor="size">size</label>
                <input type="text" id="size" name="size" placeholder="size" />
              </li>
              <li>
                <label htmlFor="energy">energy</label>
                <input
                  type="text"
                  id="energy"
                  name="energy"
                  placeholder="energy"
                />
              </li>
              <li>
                <label htmlFor="sugar">sugar</label>
                <input
                  type="text"
                  id="sugar"
                  name="sugar"
                  placeholder="sugar"
                />
              </li>

              <li>
                <label htmlFor="protein">protein</label>
                <input
                  type="text"
                  id="protein"
                  name="protein"
                  placeholder="protein"
                />
              </li>
              <li>
                <label htmlFor="cholesterol">cholesterol</label>
                <input
                  type="text"
                  id="cholesterol"
                  name="cholesterol"
                  placeholder="cholesterol"
                />
              </li>
              <li>
                <label htmlFor="totalfat">totalfat</label>
                <input
                  type="text"
                  id="totalfat"
                  name="totalfat"
                  placeholder="totalfat"
                />
              </li>
              <li>
                <label htmlFor="saturatedfat">saturatedfat</label>
                <input
                  type="text"
                  id="saturatedfat"
                  name="saturatedfat"
                  placeholder="saturatedfat"
                />
              </li>
              <li>
                <label htmlFor="transfat">transfat</label>
                <input
                  type="text"
                  id="transfat"
                  name="transfat"
                  placeholder="transfat"
                />
              </li>
              <li>
                <label htmlFor="dietaryfibre">dietaryfibre</label>
                <input
                  type="text"
                  id="dietaryfibre"
                  name="dietaryfibre"
                  placeholder="dietaryfibre"
                />
              </li>
              <li>
                <label htmlFor="sodium">sodium</label>
                <input
                  type="text"
                  id="sodium"
                  name="sodium"
                  placeholder="sodium"
                />
              </li>
              <li>
                <label htmlFor="servingsize">servingsize</label>
                <input
                  type="text"
                  id="servingsize"
                  name="servingsize"
                  placeholder="servingsize"
                />
              </li>
              <li>
                <label htmlFor="price">price</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  placeholder="price"
                />
              </li>
              <li>
                <label htmlFor="description">description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="description"
                />
              </li>
              <li>
                <label htmlFor="image">image</label>
                <input type="file" id="image" name="image" />
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

export default CreateProduct;
