import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/reviews.css";
import { getProductReviews, addProductReview } from "../actions/reviews";
// import { clearActiveLinks } from "../actions/activeLinks";

class Review extends Component {
  componentDidMount = () => {
    this.props.getProductReviews(this.props.productID);
  };

  state = {
    inputValue: ""
  };
  updateInputValue(e) {
    this.setState({
      inputValue: e.target.value
    });
  }
  reviewLeavHandler = (id, message) => {
    if (!this.props.isAuth) {
      this.props.history.push("/signin");
    } else {
      if (this.state.inputValue.trim() !== "") {
        this.props.addProductReview(id, message);
      }
      this.setState({ inputValue: "" });
    }
  };
  render() {
    console.log("FROM REVIEW COMP start");
    console.log(this.props.reviews);
    console.log("FROM REVIEW COMP end");
    const { reviews } = this.props;
    const totalReviews = reviews.length ? (
      reviews.map(review => {
        return (
          <li key={review.id} className="review__list__item">
            <div className="review__list__item__name">
              {review.author.fullName}
            </div>
            <div className="review__list__item__message">{review.message}</div>
          </li>
        );
      })
    ) : (
      <div>No Reviews</div>
    );
    return (
      <div className="reviews">
        <div className="write-review">
          <input
            value={this.state.inputValue}
            onChange={e => this.updateInputValue(e)}
            placeholder="Leave Review"
            className="review__input"
            type="text"
          />
          <button
            onClick={() =>
              this.reviewLeavHandler(
                this.props.productID,
                this.state.inputValue
              )
            }
            className="review__button"
          >
            Submit Review
          </button>
        </div>
        <ul className="review__list">{totalReviews}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated,
  reviews: state.reviews.reviews,
  error: state.products.error,
  isLoading: state.products.isLoading
});

export default connect(
  mapStateToProps,
  { getProductReviews, addProductReview }
)(Review);
