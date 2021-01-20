import React from 'react';
import axios from 'axios';

import CategoryControl from './categoryButtons/CategoryControl';
import CategoryGraphs from './categoryGraphs/CategoryGraphs';
import UserReviews from './userReviews/UserReviews';
import Modal from './modal/Modal';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      reviews: [],
      categories: [],
      reviewRatings: [
          {title: "Number Reviews", rating: 4.4},
          {title: "Cleanliness", rating: 4.5},
          {title: "Communication", rating: 5},
          {title: "Check-In", rating: 4.2},
          {title: "Accuracy", rating: 4.7},
          {title: "Looation", rating: 4},
          {title: "Value", rating: 5},
        ],
        showModal: false,
    };

  }

  componentDidMount() {
    axios.get('/api/listing/reviews')
      .then((response) => {
        console.log(response);
        this.setState({
          reviews: response.data.all_reviews,
        })
        console.log('the state is now', this.state)
      })
      .catch((error) => {
        if (!error.status) {
          return;
        }
      });
  }

  handleClick() {
    this.setState({
      showModal: true
    })
  }

  closeModal() {
    this.setState({
      showModal: false
    })
  }


  render() {
    return (
      <div>
        Hi from App!
        <CategoryGraphs ratings={this.state.reviewRatings} />
        <CategoryControl categories={this.state.categories}/>
        <UserReviews reviews={this.state.reviews}/>
        <Modal show={this.state.showModal} close={this.closeModal.bind(this)}>
          <div> Hi from modal</div>
        </Modal>
    <button type="button" onClick={this.handleClick.bind(this)}> Show all reviews</button>

      </div>
    );
  }
}

export default App;
