import React from 'react';

const WeatherComponent = (props) => {
  const { coord, name, sys, main } = props.weatherData;
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

export default WeatherComponent;
