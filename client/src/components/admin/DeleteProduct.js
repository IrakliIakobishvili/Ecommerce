import React, { Component } from "react";
import axios from "axios";

class DeleteProduct extends Component {

  hanldeDelete = productID => {
    let objIdToDelete = null;
      this.state.data.forEach(dat => { // aq states nacvlad  sxvarame unda ogond arvici ra
        if (dat.id == productID) {
          objIdToDelete = dat._id;
        }
      });
    axios.delete("http://localhost:3001/api/deleteData", {
        data: {
          id: objIdToDelete
        }
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
        <button type="delete"  onClick={this.hanldeDelete(productID)}>
              Delete The Product
        </button>
      </React.Fragment>
    );
  }
}

export default DeleteProduct;
