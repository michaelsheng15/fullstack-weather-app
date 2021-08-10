const request = require("request");

const location = process.argv[2];

const weather = require('./weather')
const forecast = require('./forecast')

const weatherLatitude = ''
const weatherLongitude = ''



if (!location) {
  console.log("Please enter valid location");
} else {
  weather(location, (error, data) => {
    if (error) {
      return console.log(error);
    } else {
      console.log(data);
      weatherLatitude = data.coord.lat
      weatherLongitude = data.coord.lon
    }
  });

}
