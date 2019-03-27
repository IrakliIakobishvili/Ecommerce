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
    inputValue: "",
    rating: ""
  };
  setGender = event => {
    this.setState({ rating: Number(event.target.value) });
    // console.log(this.state.rating);
    console.log(Number(event.target.value));
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
        this.setState({ inputValue: "" });
      } else {
        console.log("Fill all Field");
      }
    }
  };
  render() {
    console.log("FROM REVIEW COMP start");
    console.log(this.props.reviews);
    console.log("FROM REVIEW COMP end");
    const { reviews, rating } = this.props;
    const totalReviews = reviews.length ? (
      //   reviews = reviews.reverse()
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
        <div className="review__rating">Rating: {rating}</div>
        <div className="write-review">
          <div
            // className={"rate" + this.state.rating == "" ? "rate--red" : "rate"}
            className="rate"
            onChange={this.setGender.bind(this)}
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
            className="review__input"
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
        </div>
        <ul className="review__list">{totalReviews}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated,
  reviews: state.reviews.reviews,
  rating: state.reviews.rating,
  error: state.products.error,
  isLoading: state.products.isLoading
});

export default connect(
  mapStateToProps,
  { getProductReviews, addProductReview }
)(Review);
