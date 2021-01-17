const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Reviews = require('../database/Reviews.js');
const Users = require('../database/Users.js');

const app = express();
const port = 3000;
const PUBLIC_DIR = path.resolve(__dirname, '..', 'client', 'dist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// code that describes incoming request type and from where
app.use((req, res, next) => {
  console.log(`${req.method} coming in from ${req.url}`);
  next();
});

app.use(express.static(PUBLIC_DIR));

app.get('/api/users', (req, res) => {

  Users.find( function (err, users) {
    if (err) {
      res.status(404).send(err)
    } else {
      res.send(users)
    }
  })
})

app.get('/api/listing/reviews', (req, res) => {
  Reviews.find( function (err, reviews) {
    if (err) {
      res.status(404).send(err)
    } else {
      res.send(reviews)
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})