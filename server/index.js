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


let Talking_Points = {

  OverView: `I worked on the back end deployment of a reviews component for a travel site`,

  Purpose: `The goal of which was to find a path toward scaling up which suited the way users would be interacting with the app`,

  Focus_1: `The foundation of any back end is the database. So I started with some comparative database testing to select a database which best met the apps needs `,

  SubFocus_1_1: `I focused on the read and write performance differences because the user interactions with the app would be mostly read heavy `,

  SubFocus_1_2: `Mongo proved to be the best tool for the job. It allows for more flexibility when horizontal scaling by way of sharding, mongos clustering and load balancing with replication. This would allow the database to scale up in lock step with the apps evolves and grows. Lastly read operations were optimized to (X)ms with use of indexing and showed (X)% faster read speeds over an sql database for the case of higher order hierarchical data models`,

  Optional: `node --max-old-speed-size=(1024 * X) only applies to memory above 2.5Gb because the node.js default memory cap is 2.5Gb. Used in local, couldn't be used on instance unless vertical scaling was applied in conjunction`,

  Focus_2: `Next I conducted stress tests again a simple full stack deployment of the app to get some baseline data on the back end performance`,

  SubFocus_2_1: `The inital data was showing several bottle necks at X user interactions/(time). Mainly the database server memory and cpu performance were reaching their limits at (X)% & (X)% respectively. This was consuming a majority of the available resources and let to a noticable front end performance decline`,

  Optional: `Log throughput, max memory, max cpu, latency, etc`,

  Focus_3: `Finally based on the baseline data I implemented some horizontal scaling techniques to optimize user-database interaction (back end) performance. ....such as modularizing the app components to distribute resources and improve the computing power within each module`,

  SubFocus_3_1: `Initially single server ram performance was maxing out at X% of its max capacity with X user interactions/(time). To accomodate for this I added a load balancer to spread out the memory load evenly among 3 servers`,

  Optional: `Log throughput, max memory, max cpu, latency, etc to justify changes`

  };