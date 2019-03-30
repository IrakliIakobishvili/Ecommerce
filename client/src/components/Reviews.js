import React, { Component } from "react";
import { connect } from "react-redux";
import "../styles/reviews.css";
import {
  getProductReviews,
  addProductReview,
  clearReviews,
  clearFeedback
} from "../actions/reviews";
// import { clearActiveLinks } from "../actions/activeLinks";

class Review extends Component {
  componentDidMount = () => {
    this.props.getProductReviews(this.props.productID);
    // console.log("SSS");
  };
  componentWillUnmount() {
    // console.log("OOOOOOOOOOOOOOO");
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
    // console.log(this.state.rating);
    // console.log(Number(event.target.value));
  };
  updateInputValue(e) {
    this.setState({
      inputValue: e.target.value
    });
  }
  reviewLeavHandler = (id, message, rating) => {
    if (!this.props.isAuth) {
      this.props.history.push("/signin");
    } else {
      if (this.state.inputValue.trim() !== "" && this.state.rating !== "") {
        this.props.addProductReview(id, message, rating);
        this.setState({ inputValue: "", warning: false });
        // this.setState({ warning: false });
        // this.se
      } else {
        this.setState({ warning: true });
        // console.log("Fill all Field");
      }
    }
  };
  componentWillReceiveProps() {
    // this.setState({ feedback: this.props.feedback });
    setTimeout(() => {
      this.props.clearFeedback();
    }, 3000);
  }
  render() {
    console.log("FROM REVIEW COMP start");
    console.log(this.props.reviews);
    console.log("FROM REVIEW COMP end");
    const { reviews, rating, feedback } = this.props;
    const totalReviews = reviews.length ? (
      reviews.map(review => {
        let date =
          review.date.split("T")[0] +
          " " +
          review.date.split("T")[1].split(".")[0];
        return (
          <li key={review.id} className="review__list__item">
            <div className="review__list__item__name">
              {review.author.fullName}
            </div>
            <div className="review__list__item__message">
              {review.message}
              <div className="review__date">{date}</div>
            </div>
          </li>
        );
      })
    ) : (
      <div>No Reviews</div>
    );
    return (
      <div className="reviews">
        <div className="review__rating">Rating: {rating}</div>
        <div className="write-review">
          <div
            // className={"rate" + this.state.rating == "" ? "rate--red" : "rate"}
            className="rate"
            onChange={this.setRating.bind(this)}
          >
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
          <input
            value={this.state.inputValue}
            onChange={e => this.updateInputValue(e)}
            placeholder="Leave Review"
            // className="review__input"
            className={`review__input ${this.state.warning ? "warning" : null}`}
            type="text"
          />
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
  error: state.products.error,
  isLoading: state.products.isLoading
});

export default connect(
  mapStateToProps,
  { getProductReviews, addProductReview, clearReviews, clearFeedback }
)(Review);
