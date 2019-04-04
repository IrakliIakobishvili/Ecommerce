import React, { Component } from "react";
import { connect } from "react-redux";
import "../../styles/admin/categories.css";

import {
  getCategoriesByTitle,
  getCategoriesAdmin,
  addCategory
} from "../../actions/admin";

class Categories extends Component {
  state = {
    inputValue: "",
    title: "",
    categoryID: ""
  };
  updateInputValue = e => {
    this.setState({ inputValue: e.target.value });
    console.log(this.state.inputValue);
  };
  searchHandler = () => {
    if (this.state.inputValue) {
      this.props.getCategoriesByTitle(this.state.inputValue);
    } else {
      this.props.getCategoriesAdmin();
    }
  };
  categoryOnclickHandler = el => {
    const { title, categoryID } = el;
    this.setState({ title, categoryID });
  };
  categoryAddHandler = e => {
    e.preventDefault();
    const data = {
      title: this.state.title,
      categoryID: this.state.categoryID
    };
    this.props.addCategory(data);
  };
  inputValues = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { categories } = this.props;
    const cats = categories.length ? (
      categories.map((el, i) => {
        return (
          <li
            className="cat__list__item"
            onClick={() => this.categoryOnclickHandler(el)}
            key={el._id}
          >
            <span className="number">{++i}</span>
            <span className="title">{el.title}</span>
          </li>
        );
      })
    ) : !categories.length ? (
      <div className="empty--static">
        <i className="far fa-meh" />
      </div>
    ) : null;
    return (
      <div className="admin-categories">
        <div className="container">
          <div className="cat-search">
            <input
              type="text"
              placeholder="Search Categories"
              value={this.state.inputValue}
              onChange={this.updateInputValue}
              onKeyUp={this.searchHandler}
            />
          </div>
          <form className="admin-cat__form" onSubmit={this.categoryAddHandler}>
            <input
              value={this.state.title}
              onChange={e => this.inputValues(e)}
              placeholder="Title"
              type="text"
              name="title"
            />
            <input
              value={this.state.categoryID}
              onChange={e => this.inputValues(e)}
              placeholder="ID"
              type="text"
              name="categoryID"
            />
            <button>ADD</button>
          </form>
          <ul className="cats-list">{cats}</ul>
        </div>
      </div>
    );
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
  { getCategoriesByTitle, getCategoriesAdmin, addCategory }
)(Categories);
