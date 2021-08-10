import React from "react";
import "./styles.css";
import { Container, Row, Col } from "react-bootstrap";

import { GoSearch } from "react-icons/go";
import { BsArrowUpShort } from "react-icons/bs";
import { BsArrowDownShort } from "react-icons/bs";

import back from "../img/back.jpeg";

export default class FetchWeather extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      weather: null,
      location: null,
      temperature: null,
      feelsLike: null,
      description: null,
      icon: null,
      input: "",
    };
  }

  myChangeHandler = (e) => {
    this.setState({ input: e.target.value });
  };

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.input);

    fetch("http://localhost:3001/weather?location=" + this.state.input)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          loading: false,
          weather: Math.round(data.temperature.temp),
          location: data.location,
          description: data.description[0].main,
          icon:
            "http://openweathermap.org/img/w/" +
            data.description[0].icon +
            ".png",
          feelsLike: Math.round(data.temperature.feels_like),
          temperature: data.temperature,
          current: data.forecast.current,
          max: Math.round(data.temperature.temp_max),
          min: Math.round(data.temperature.temp_min),
        });
      });
  }

  render() {
    return (
      <div className="screen">
        <form onSubmit={(e) => this.handleSubmit(e)} className="form">
          <input
            type="text"
            required
            onChange={this.myChangeHandler}
            placeholder="Search"
          />
        </form>

        {this.state.loading ? (
          <h1 className='starter'>Developed by Michael Sheng &copy; 2021</h1>
        ) : (
          <Container>
            <h3 style={{ textAlign: "left", marginLeft: "20px" }}>
              Weather Dashboard for {this.state.location}
            </h3>{" "}
            <Row>
              <Col sm={8}>
                <div className="current-col">
                  <Row className="current-inner-row">
                    <Col className="current-inner-col" sm={5}>
                      <h1 className="current-temp">
                        {this.state.weather}
                        <span>&#176;</span>
                      </h1>
                    </Col>
                    <Col className="current-inner-col" id="description" sm={7}>
                      <h3>
                        {this.state.description}
                        <img src={this.state.icon} />
                      </h3>
                      <h4>
                        <span style={{ fontWeight: "400" }}>
                          <BsArrowUpShort />
                          {this.state.max}
                          <span>&#176;</span>
                        </span>
                        <BsArrowDownShort />
                        {this.state.min}
                        <span>&#176;</span>
                        // Feels Like {this.state.feelsLike}
                        <span>&#176;</span>
                      </h4>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col sm={4}>
              </Col>
            </Row>
            <Row>
              <Col sm={3}>
                <div className="current-col" id="grid">
                  <h4>Humidity 💦</h4>
                  <h2>{this.state.temperature.humidity}%</h2>
                </div>
              </Col>
              <Col sm={3}>
                <div className="current-col" id="grid">
                  {" "}
                  <h4>Pressure 🎈</h4>
                  <h2>{this.state.temperature.pressure}mb</h2>
                </div>
              </Col>
              <Col sm={3}>
                <div className="current-col" id="grid">
                  {" "}
                  <h4>Visibility ☀️</h4>
                  <h2>{this.state.current.visibility}m</h2>
                </div>
              </Col>
              <Col sm={3}>
                <div className="current-col" id="grid">
                  {" "}
                  <h4>Wind Speed 💨</h4>
                  <h2>{this.state.current.wind_speed}m/s</h2>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}
