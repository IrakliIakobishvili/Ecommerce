import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/reviews.css";
import {
  getProductReviews,
  addProductReview,
  clearReviews,
  clearFeedback
} from "../actions/reviews";

class Review extends Component {
  componentDidMount = () => {
    this.props.getProductReviews(this.props.productID);
  };
  componentWillUnmount() {
    this.props.clearReviews();
  }

  state = {
    inputValue: "",
    rating: "",
    warning: false,
    feedback: ""
  };
  setRating = event => {
    this.setState({ rating: Number(event.target.value) });
  };
  updateInputValue(e) {
    this.setState({
      inputValue: e.target.value
    });
  }
  reviewLeavHandler = async (id, message, rating) => {
    if (!this.props.isAuth) {
      this.props.history.push("/signin");
    } else {
      if (this.state.inputValue.trim() !== "" && this.state.rating !== "") {
        await this.props.addProductReview(id, message, rating);
        this.setState({ inputValue: "", warning: false });
      } else {
        this.setState({ warning: true });
      }
    }
  };
  componentWillReceiveProps() {
    setTimeout(() => {
      this.props.clearFeedback();
    }, 3000);
  }
  render() {
    const { reviews, rating, feedback, isLoading } = this.props;
    const totalReviews = reviews.length ? (
      reviews.map(review => {
        let date =
          review.date.split("T")[0] +
          " " +
          review.date.split("T")[1].split(".")[0];
        return (
          <li key={review.id} className="review__list__item">
            <div className="review__list__item__name">
              <i className="fas fa-user" />
              <span>{review.author.fullName}</span>
            </div>
            <div className="review__list__item__message">{review.message}</div>
            <div className="review-details">
              <div className="review__star">
                {review.rating == 1
                  ? "★"
                  : review.rating == 2
                  ? "★★"
                  : review.rating == 3
                  ? "★★★"
                  : review.rating == 4
                  ? "★★★★"
                  : review.rating == 5
                  ? "★★★★★"
                  : null}
              </div>
              <div className="review__date">{date}</div>
            </div>
          </li>
        );
      })
    ) : this.props.isLoading ? (
      <div className="loading loading--static">
        <i className="fas fa-spinner" />
      </div>
    ) : null;
    return (
      <div className="reviews">
        <div className="review__rating">
          <i className="far fa-star" />
          <span>{rating}</span>
        </div>
        <div className="write-review">
          <textarea
            value={this.state.inputValue}
            onChange={e => this.updateInputValue(e)}
            placeholder="Leave Review"
            className={`review__input ${this.state.warning ? "warning" : ""}`}
            type="text"
          />
          <div className="rate" onChange={this.setRating.bind(this)}>
            <input type="radio" id="star5" name="rate" value="5" />
            <label htmlFor="star5" />
            <input type="radio" id="star4" name="rate" value="4" />
            <label htmlFor="star4" />
            <input type="radio" id="star3" name="rate" value="3" />
            <label htmlFor="star3" />
            <input type="radio" id="star2" name="rate" value="2" />
            <label htmlFor="star2" />
            <input type="radio" id="star1" name="rate" value="1" />
            <label htmlFor="star1" />
          </div>
          <button
            onClick={() =>
              this.reviewLeavHandler(
                this.props.productID,
                this.state.inputValue,
                this.state.rating
              )
            }
            className="review__button"
          >
            Submit Review
          </button>
          <div className="review-feedback">{feedback}</div>
        </div>
        <ul className="review__list">{totalReviews}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated,
  reviews: state.reviews.reviews,
  feedback: state.reviews.feedback,
  rating: state.reviews.rating,
  error: state.reviews.error,
  isLoading: state.reviews.isLoading
});

export default connect(
  mapStateToProps,
  { getProductReviews, addProductReview, clearReviews, clearFeedback }
)(Review);
