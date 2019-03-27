import React, { Component } from 'react'
import { connect } from "react-redux";

import {getCategoriesByTitle} from "../../actions/admin";

class AdminCategories extends Component {
    state = {
        inputValue: ""
      };
      updateInputValue =(e) =>{
        this.setState({
          inputValue: e.target.value
        });
      }
      searchHandler = () => {
        //   console.log(this.state.inputValue)
        this.props.getCategoriesByTitle(this.state.inputValue)
      }
  render() {
    return (
      <div className='admin-categories'>
        <div className='container'>
            <h3>Categories</h3>
            <div className='cat-search'>
                <input type='text' onChange={(e) =>this.updateInputValue(e)} onKeyUp={this.searchHandler()}/>
            </div>
        </div>
      </div>
    )
  }
}


export default connect( 
    null,
    {getCategoriesByTitle }
  )(AdminCategories);