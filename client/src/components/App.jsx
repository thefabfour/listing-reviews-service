import React from 'react';
import axios from 'axios';
import classes from './App.module.css'

import CategoryControl from './categoryButtons/CategoryControl';
import CategoryGraphs from './categoryGraphs/CategoryGraphs';
import UserReviews from './userReviews/UserReviews';
import ShowAll from './showAll/ShowAll'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      reviews: [],
      categories: [
        { title: 'Central location', count: 1 },
        { title: 'Responsive host', count: 2 },
        { title: 'Helpful host', count: 2 },
        { title: 'Great restaurants', count: 2 },
        { title: 'Easy check-in', count: 4 },
        { title: 'Friendly host', count: 2 },
        { title: 'Great views', count: 1 },
        { title: 'Thoughtful touches', count: 1 },
        { title: 'Great location', count: 1 },
      ],
      reviewRatings: [],
      showModal: false,
      numReviews: undefined,
      overallRatingAvg: undefined,
      categorySelected: 'Great location',
    };
  }

  componentDidMount() {
    axios.get('/api/listing/reviews')
      .then((response) => {
        this.setState({
          reviews: response.data.all_reviews,
          categories: response.data.review_categories,
          reviewRatings: response.data.review_ratings,
          numReviews: response.data.num_reviews,
          overallRatingAvg: response.data.overall_rating_avg,
        });
      })
      .catch((error) => {
        if (!error.status) {
          return;
        }
      });
  }

  handleClick() {
    this.setState({
      showModal: true,
    });
  }

  handleCategorySelect() {
    const category = event.target.id;
    console.dir(category);
    this.setState({
      categorySelected: category,
    });
    this.handleClick();
  }

  closeModal() {
    this.setState({
      showModal: false,
    });
  }

  render() {
    let reviewsInModal;

    if (!this.state.categorySelected){
      reviewsInModal= this.state.reviews
    } else {
      reviewsInModal= this.state.reviews.filter(review => review.category === this.state.categorySelected)
      console.log(reviewsInModal)
    }

    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <span className={classes.star}> &#9733;</span>
        <span className={classes.headerText}> {this.state.overallRatingAvg} ({this.state.numReviews} reviews) </span>
        </div>
        <div>
          <CategoryGraphs ratings={this.state.reviewRatings} />
          <CategoryControl categories={this.state.categories} clicked={this.handleCategorySelect.bind(this)}/>
          <UserReviews reviews={this.state.reviews}/>

          <ShowAll show={this.state.showModal} close={this.closeModal.bind(this)}>
            <CategoryGraphs ratings={this.state.reviewRatings} />
            <CategoryControl categories={this.state.categories} clicked={this.handleCategorySelect.bind(this)}/>
            <UserReviews reviews={reviewsInModal}/>
          </ShowAll>

          <button className={classes.showAllBtn} type="button" onClick={this.handleClick.bind(this)}> Show all reviews</button>
        </div>
      </div>
    );
  }
}

export default App;
