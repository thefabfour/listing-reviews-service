import React from 'react';
import moment from 'moment';
import classes from './UserReviews.module.css';

const ReviewsHeader = ({profilePicture, firstName, entryDate}) => (
  <div className={classes.header}>
    <img className={classes.userPhoto} alt="" src={`${profilePicture}?dummy=8484744`} />
    <div className={classes.textContainer}>
      {firstName}
      <div className={classes.date}>
        {moment(entryDate).format('MMMM YYYY')}
      </div>
    </div>
  </div>
);

export default ReviewsHeader;
