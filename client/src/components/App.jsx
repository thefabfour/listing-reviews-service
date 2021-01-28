import React from 'react';
import axios from '../../axios';
import classes from './App.module.css';

import CategoryControl from './categoryButtons/CategoryControl';
import CategoryGraphs from './categoryGraphs/CategoryGraphs';
import UserReviews from './userReviews/UserReviews';
import ShowAll from './showAll/ShowAll';
import ListingHeader from './ListingHeader';

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
      categorySelected: {
        title: undefined, count: undefined,
      },
    };

    this.handleCategorySelect = this.handleCategorySelect.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
  }

  componentDidMount() {
    axios.get('/')
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
        throw new Error(error);
      });
  }

  handleClick() {
    this.setState({
      showModal: true,

    });
  }

  handleCategorySelect(event) {
    const { categories } = this.state;

    const categoryIndex = event.target.id;
    const categorySelected = categories[categoryIndex];
    this.setState({
      categorySelected,
    });
    this.handleClick();
  }

  closeModal() {
    this.setState({
      showModal: false,
      categorySelected: {
        title: undefined, count: undefined,
      },
    });
  }

  render() {
    let reviewsInModal;
    const {
      categorySelected, reviews, overallRatingAvg, numReviews, categories, reviewRatings, showModal,
    } = this.state;

    if (!categorySelected.title) {
      reviewsInModal = reviews;
    } else {
      reviewsInModal = reviews.filter((review) => review.category === categorySelected.title);
    }

    return (
      <div className={classes.container}>
        <ListingHeader
          overallRatingAvg={overallRatingAvg}
          numReviews={numReviews}
        />
        <div>
          <CategoryGraphs ratings={reviewRatings} isForModal={false} />
          <CategoryControl
            categories={categories}
            clicked={this.handleCategorySelect}
          />
          <UserReviews reviews={reviews} />

          <ShowAll
            show={showModal}
            close={this.closeModal}
            categorySelected={categorySelected}
            overallRatingAvg={overallRatingAvg}
            numReviews={numReviews}
          >
            <CategoryGraphs ratings={reviewRatings} isForModal />
            <CategoryControl
              categories={categories}
              clicked={this.handleCategorySelect}
            />
            <UserReviews reviews={reviewsInModal} />
          </ShowAll>

          <button className={classes.showAllBtn} type="button" onClick={this.handleClick.bind(this)}> Show all reviews</button>
        </div>
      </div>
    );
  }
}

export default App;
