const URI = require('./config.js');
const uuid = require('uuid');
const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));
const { Schema } = mongoose;

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};


const policeSchema = new Schema({
  _id: String,
  fullName: String,
  state: String,
  agency: String,
  yearDecertified: Number,
  link: String,
  ratingAvg: {type: Number, min: 1, max: 5},
  reviews: [{ type: String, ref: 'reviews' }]
});

const reviewSchema = new Schema({
  _id: String,
  parentId: String,
  review: {type: String, required: true, minlength: 1, maxlength: 400},
  rating: {type: Number, min: 1, max: 5},
  reviewDate: Date
});

const PoliceData = mongoose.model('policeData', policeSchema);
const PoliceReview = mongoose.model('policeReview', reviewSchema);

mongoose.connect(URI.URI, OPTIONS)
  .then(() => console.log(`Connected to mongoDB on PORT: 27017`))
  .catch(error => console.error(error));

  const { connection } = mongoose;

  policeSchema.index({ _id: 1, state: -1, year: 1, agency: 1, fullName: -1});
  reviewSchema.index({ _id: 1, parentId: -1, rating: 1, reviewDate: -1});

  connection.on('error', (err) => console.error(err));

  connection.once('open', () => {
    console.log(`Using database ${connection.name}`);
  });

  PoliceData.collection.stats((err, results) => {
    var megabytes = (results.size / 1000000);
    var stats = {};
    stats.dataInDatabaseB = `${results.size} bytes of data in collection`;
    stats.dataInDatabaseMb = `${megabytes} Mb of data in collection`;
    stats.docCount = `${results.count} documents in collection`;
    stats.avgObjSize = results.avgObjSize;
    stats.storageSize = results.storageSize;

    console.log(`Police Collection Stats: `, stats);
  });

  PoliceReview.collection.stats((err, results) => {
    var megabytes = (results.size / 1000000);
    var stats = {};
    stats.dataInDatabaseB = `${results.size} bytes of data in collection`;
    stats.dataInDatabaseMb = `${megabytes} Mb of data in collection`;
    stats.docCount = `${results.count} documents in collection`;
    stats.avgObjSize = results.avgObjSize;
    stats.storageSize = results.storageSize;

    console.log(`Police Collection Stats: `, stats);
  });

  module.exports = {

    getAllData: (req, res) => {

      return PoliceData.find().sort({state: 'asc'}).limit(300).exec((err, policeList) => {
        if (err) {
          res.status(400).next(err);
        }
        res.status(200).json(policeList);
      });
    },

    search: (req, res) => {
      let searchObj = req.query;
      let state = req.query.state; // No Longer Need
      let newArray = {};

      for (var key in searchObj) {
        if (searchObj[key].length < 1) {
        } else {
          newArray[key] = searchObj[key];
        }
      };

      return PoliceData.find(newArray).sort().limit(200).exec((err, policeList) => {
        if (err) {
          res.status(400).next(err);
        }
        console.log(`Police search: `, policeList);
        res.status(200).json(policeList);
      })

    },

    savePoliceData: (policeContainer) => {
      let docNum = policeContainer.length;

      return PoliceData.create(policeContainer)
      .then(policeDoc => console.log(`PoliceData documents saved: ${docNum}`))
      .catch(error => console.error(error));

    },

    saveNewPolice: (req, res) => {
      let policeContainer = req.body;
      policeContainer._id = uuid.v4();
      console.log(`Police added: `, policeContainer);

      return PoliceData.create(policeContainer)
      .then(policeDoc => {
        console.log(`Police document saved: `);
        res.status(200);
      })
      .catch(error => {
        console.error(error);
        res.status(400);
      });

    },

    savePoliceReview: (req, res) => {
      let reviewContainer = req.body;
      console.log(`Police Review Submitted: `, reviewContainer)

      // return PoliceReview.create(reviewContainer)
      // .then(reviewDoc => {
      //   console.log(`Review document saved: `);
      //   res.status(200);
      // })
      // .catch(error => {
      //   console.error(error);
      //   res.status(400);
      // });

    }

  }