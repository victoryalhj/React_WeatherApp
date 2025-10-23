import { Button } from 'react-bootstrap'
import React from 'react'


const WeatherButton = () => {
  return (
    <div>
      <Button variant="warning">Current Location</Button>
      <Button variant="warning">London</Button>
      <Button variant="warning">New York</Button>
    </div>
  )
}

export default WeatherButton
