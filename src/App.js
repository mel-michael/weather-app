import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import WeatherComponent from './components/Weather';
require('dotenv').config();

const WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather?q=';
const { REACT_APP_API_KEY: API_KEY } = process.env;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      cityList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.findCity = this.findCity.bind(this);
    this.deleteCity = this.deleteCity.bind(this);
  }

  handleChange(e) {
    this.setState({ cityName: e.target.value });
  }

  findCity() {
    axios.get(`${WEATHER_API}${this.state.cityName}&APPID=${API_KEY}`)
      .then((result) => {
        this.setState({ cityList: [...this.state.cityList, result.data] })
      })
      .catch(err => console.error(err))
  }

  deleteCity(id) {
    this.setState({ cityList: this.state.cityList.filter(list => list.id !== id) })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Weather App</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="text" onChange={this.handleChange} /> <br /> <br />
        <button onClick={this.findCity}>Search</button> <br /> <br />

        {
          this.state.cityList.length > 0 ?
            this.state.cityList.map(item =>
              <WeatherComponent weatherData={item}
                onDelete={this.deleteCity}
                key={item.id}
              />
            )
            : null
        }

      </div>
    );
  }
}

export default App;
