import React, { Component } from 'react';
import axios from "axios";
class UserDelete extends Component {
    deleteHandler = userID => {
        let userIdToDelete = null;
          this.state.data.forEach(dat => { // aq states nacvlad  sxvarame unda ogond arvici ra
            if (dat.id == productID) {
              userIdToDelete = dat._id;
            }
          });
        axios.delete("http://localhost:3001/api/deleteData", { //misamartia shesacvleli
            data: {
              id: userIdToDelete
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
            <button type='delete' onClick={this.deleteHandler(userID)}>
            Delete User
            </button>
         );
    }
}
 
export default UserDelete;