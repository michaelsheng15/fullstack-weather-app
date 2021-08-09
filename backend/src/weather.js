const request = require("request");

const weather = (location, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    location +
    "&appid=fdcd29dedafe2acd1825522e5bcc4f3a&units=metric";
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather API", undefined);
    } else if (!response.body) {
      callback("Please enter a valid address", undefined);
    } else {
      callback(undefined, response.body);
    }
  });
};

module.exports = weather;
