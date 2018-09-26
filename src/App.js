import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
// import 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css';

const WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = 'ec740e5d84f0be721f85e781dc731cc7';

function WeatheComponent (props) {
  console.log(props);
  const { coord, name, sys, main} = props.weatherData;
  return (
    <ul>
      <li>City: {name}</li>
      <li>Country: {sys.country}</li>
      <li>Latitude: {coord.lat}</li>
      <li>Longitude: {coord.lon}</li>
      <li>Humidity: {main.humidity}</li>
      <li>Pressure: {main.pressure}</li>
      <button onClick={props.onDelete}>Delete</button> <br /> <br /><hr />
    </ul>
  );
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      cityList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.findCity = this.findCity.bind(this);
    // this.deleteCity = this.deleteCity.bind(this);
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({ cityName: e.target.value });
  }

  findCity() {
    axios.get(`${WEATHER_API}${this.state.cityName}&APPID=${API_KEY}`)
      .then((result) => {
        console.log(result);
        this.setState({ cityList: [...this.state.cityList, result.data] })
      })
      .catch(err => console.error(err))
  }

  deleteCity(id) {
    console.log(id);
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
        <input type="text" onChange={this.handleChange} /> <br /> <br/>
        <button onClick={this.findCity}>Search</button> <br /> <br />

        {
          this.state.cityList.length > 0 ?
            this.state.cityList.map(item =>
              <WeatheComponent weatherData={item}
                onDelete={this.deleteCity.bind(this, item.id)}
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
