import React, { Component} from "react";
import axios from 'axios';


class Admin extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //     adminOnline : true,
    //     users: []     
    //     }
    //   }
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

    render () {
        return (
            <div>
                <button onClick={this.showAdminContent}>All Users</button>             
            </div>
        )
    }
 //    <Admin click:onClick/>
 // es sadgac...aq admini tu dalogindeba profilad esaa ra............<Link to='/admin'>Admin Profile<Link>
 // esec sadgac unda chaisvas arvici sad.................<Route exact path='/admin' component={Admin}/>
 


}


export default Admin;