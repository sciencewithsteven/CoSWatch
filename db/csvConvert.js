const mongo = require('./index.js');
const uuid = require('uuid');
const fs = require("fs");
const fastcsv = require("fast-csv");
const csvtojson = require("csvtojson");
const policeFile = '/Users/stevenjones/Documents/HR_127/MVP/db/policeData.csv';


var policeCSV = csvtojson().fromFile(policeFile)
  .then(csvData => {
    var policeArray = [];

    console.log(csvData);
    for (var i = 0; i < csvData.length; i++){
      let policeObj = {};
      policeObj._id = uuid.v4();
      policeObj.fullName = csvData[i]["Name:"];
      policeObj.state = csvData[i]["State:"];
      policeObj.agency = csvData[i]["Agency:"];
      policeObj.year = parseInt(csvData[i]["Year decertified:"]);
      policeObj.link = csvData[i].field5;
      policeArray.push(policeObj);
    };

    console.log(`PoliceArray: `, policeArray);

    mongo.savePoliceData(policeArray);
  });

// return policeCSV;

// let stream = fs.createReadStream("/Users/stevenjones/Documents/HR_127/MVP/db/policeData.csv");
// let csvData = [];
// let csvStream = fastcsv
//   .parse()
//   .on("data", function(data) {
//     csvData.push({
//       fullName: data[0],
//       state: data[1],
//       agency: data[2],
//       yearDecertified: data[3],
//       link: data[4]
//     });
//   })
//   .on("end", function() {
//     // remove the first line: header
//     csvData.shift();
//     console.log(`csvData: `, csvData);

//     // save to the MongoDB database collection
//   });

console.log(`policeCSV: `, policeCSV);
// stream.pipe(csvStream);