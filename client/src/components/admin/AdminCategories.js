import React, { Component } from 'react'
import { connect } from "react-redux";

import {getCategoriesByTitle,getCategoriesAdmin} from "../../actions/admin";

class AdminCategories extends Component {
    state = {
        inputValue: ""
      };
      updateInputValue =(e) =>{
        this.setState({inputValue:e.target.value})
        console.log(this.state.inputValue)
      }
      searchHandler = () => {
          console.log('state start')
          console.log(this.state.inputValue)
          console.log('state end')
        if(this.state.inputValue) {
            this.props.getCategoriesByTitle(this.state.inputValue)
            // console.log('ppppppppppp')
        }else {
            this.props.getCategoriesAdmin();
            // console.log('ccccccccccccc')
        }        
      }
  render() {
    //   console.log("Tekle")
    //   console.log(this.props.categories)

    const {categories} = this.props;
    const cats = categories.length ? (
        categories.map(el => {
            return <li key={el._id}>{el.title}</li>
        })
    ):(
        <h3>No Categories</h3>
    )

    return (
      <div className='admin-categories'>
        <div className='container'>
            <h3>Categories</h3>
            <div className='cat-search'>
                <input type='text' value={this.state.inputValue} onChange={this.updateInputValue} onKeyDown={this.searchHandler}/>
            </div>
            <ul>
                {cats}
            </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
    categories: state.admin.categories,
    error: state.admin.error,
    isLoading: state.admin.isLoading
    };
}
    
export default connect( 
    mapStateToProps,
    {getCategoriesByTitle, getCategoriesAdmin }
  )(AdminCategories);