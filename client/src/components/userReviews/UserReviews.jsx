import React from 'react';
import UserReviewsControl from './UserReviewsControl';
import classes from './UserReviews.module.css';

function UserReviews({reviews}) {
  const itemsArr = reviews.slice(1,7);
  const reviewsList = itemsArr.map((review, index) => <UserReviewsControl review={review} index={index}/>);

  return (
    <div className={classes.parent}>
      {reviewsList}
    </div>
  );
}

export default UserReviews;


