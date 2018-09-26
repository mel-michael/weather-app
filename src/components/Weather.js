import React from 'react';

export default class WeatherComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.props.onDelete(this.props.weatherData.id);
  }

  render() {
    const { coord, name, sys, main } = this.props.weatherData;
    return <ul>
      <li>City: {name}</li>
      <li>Country: {sys.country}</li>
      <li>Latitude: {coord.lat}</li>
      <li>Longitude: {coord.lon}</li>
      <li>Humidity: {main.humidity}</li>
      <li>Pressure: {main.pressure}</li>
      <br />
      <button onClick={this.handleDelete}>Delete</button> <br /> <br />
      <hr />
    </ul>;
  }

}
