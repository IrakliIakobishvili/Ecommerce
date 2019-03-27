import React, { Component } from 'react'
import { connect } from "react-redux";
import "../../styles/admin/categories.css"

import {getCategoriesByTitle,getCategoriesAdmin,addCategory} from "../../actions/admin";

class AdminCategories extends Component {
    state = {
        inputValue: "",
        title:'',
        categoryID:''
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
      categoryOnclickHandler = (el) => {
          console.log(el)
      }
      categoryAddHandler = (e) => {
        e.preventDefault()
        const data = {
            title:this.state.title,
            categoryID:this.state.categoryID
        }
        // console.log(data)
        this.props.addCategory(data);
      }
      inputValues = (e) => {
          console.log(e.target.name)
          this.setState({[e.target.name]:e.target.value})
      }
  render() {
    //   console.log("Tekle")
    //   console.log(this.props.categories)

    const {categories} = this.props;
    const cats = categories.length ? (
        categories.map(el => {
            return <li onClick={() => this.categoryOnclickHandler(el)} key={el._id}>{el.title}</li>
        })
    ):(
        <h3>No Categories</h3>
    )

    return (
      <div className='admin-categories'>
        <div className='container'>
            <h3 className='admin-categories__heading'>Categories</h3>
            <div className='admin-categories-aside admin-categories-aside--left'>
                <div className='cat-search'>
                    <input type='text' value={this.state.inputValue} onChange={this.updateInputValue} onKeyDown={this.searchHandler}/>
                </div>
                <ul>
                    {cats}
                </ul>
            </div>
            <div className='admin-categories-aside admin-categories-aside--right'>
                <h3>Edit / Add</h3>
                <form onSubmit={this.categoryAddHandler} onChange={(e)=>this.inputValues(e)}>
                    <input placeholder='Title' type='text' name='title' /><br/><br/>
                    <input placeholder='ID' type='text' name='categoryID' /><br/>
                    <button>ADD</button>
                </form>
            </div>
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
    {getCategoriesByTitle, getCategoriesAdmin, addCategory }
  )(AdminCategories);