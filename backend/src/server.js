const express = require("express");
const weather = require("./weather");
const forecast = require("./forecast");
var cors = require("cors");

const app = express();

app.use(cors());

app.get("/weather", (req, res) => {
  weather(req.query.location, (error, { name, main, weather, coord }) => {
    if (error) {
      return res.send(error);
    }

    forecast(coord.lat, coord.lon, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      } else {
        res.send({
          location: name,
          temperature: main,
          description: weather,
          forecast: forecastData,
        });
      }
    });
  });
});

app.listen(3001, () => {
  console.log("Server is up on port 3001");
});
