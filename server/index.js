const db = require('../db/index.js');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const path = require('path');
const app = express();
const port = 4000;

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );
app.use(morgan('dev'));

// path.join(__dirname, '../client/dist')
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/police', db.getAllData);
app.get('/search', db.search);
app.post('/addPolice', db.saveNewPolice);
app.post('/addReview', db.savePoliceReview);

app.listen(port, () => {
  console.log(`MongoDb server listening on port ${port}!`);
});