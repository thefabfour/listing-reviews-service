import React from 'react';
import PropTypes from 'prop-types';

import classes from './Buttons.module.css'

const ButtonsDisplay = (props) => (

    <div className={classes.container}>
      {props.categories.map((category) =>
      <button type="button"  className= {classes.btn}> {category.title}  {category.count} </button>

      )}
    </div>

);


export default ButtonsDisplay;
