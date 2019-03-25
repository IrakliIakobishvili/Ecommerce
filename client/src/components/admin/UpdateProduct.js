import React, { Component } from "react";
import axios from "axios";

class UpdateProduct extends Component {
    handleUpdate = (idToUpdate, updateToApply) => {
        let objIdToUpdate = null;
        this.state.data.forEach(dat => {
          if (dat.id == idToUpdate) {
            objIdToUpdate = dat._id;
          }
        });
    
        axios.post("http://localhost:3001/products/updateData", {
          id: objIdToUpdate,
          update: { message: updateToApply }
        })
        .then(function(response) {
            console.log(response);
          })
          .catch(function(response) {
            console.log(response);
          });
      };

  };
  render() {
    return (
      <React.Fragment>
        <button type="update"  onClick={this.handleUpdate(productID)}>
              Update The Product
        </button>
      </React.Fragment>
    );
  }
}

export default UpdateProduct;
