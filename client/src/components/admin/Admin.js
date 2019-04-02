import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Users from "./Users";
import Products from "./Products";
import Categories from "./Categories";
import Contacts from "./Contacts";
import "../../styles/admin/index.css";

class Admin extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //     adminOnline : true,
  //     users: []
  //     }
  //   } vergavige ratqvi aa ara gaagrdzel4
  //   componentDidMount() {
  //     axios.get('http://localhost:5000/api/users/all')
  //       .then((response) => {
  //           console.log(response)
  //           this.setState({
  //             users: response.data
  //           });
  //       })
  //       .catch(function (error) {
  //           console.log(error);
  //       });
  // }
  //   showAdminContent = () => {s
  // if(adminOnline){
  //     let users = []

  //     for (let i = 0; i < 3; i++) {
  //     users.push(<li>
  //     {this.state.users[i]}
  //     </li>)
  //     }
  //     return users
  // }

  //   }
  //ეს ვაფსჰე ტავიდან იყო საანამ იმ კომპონენტებს ვიზავდი, მეგონა ამ ერტ კომპონენტსჰი უნდა მექნა ყველა ფუნცტია

  render() {
    return (
      <div className="admin-page">
        <BrowserRouter>
          <div className="container">
            <div className="admin-page-wrapper">
              <div className="admin-page-aside">
                <Navigation />
              </div>
              <div className="admin-page-content">
                {/* <Route exact path="/admin/" component={Details} /> */}
                <Route exact path="/admin/" component={Users} />
                <Route exact path="/admin/users" component={Users} />
                <Route exact path="/admin/products" component={Products} />
                <Route exact path="/admin/categories" component={Categories} />
                <Route exact path="/admin/contacts" component={Contacts} />
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
  //    <Admin click:onClick/>
  // es sadgac...aq admini tu dalogindeba profilad esaa ra............<Link to='/admin'>Admin Profile<Link>
  // esec sadgac unda chaisvas arvici sad.................<Route exact path='/admin' component={Admin}/>
}

export default Admin;

// <div>
//     <button onClick={this.showAdminContent}>All Users</button>
// </div>
