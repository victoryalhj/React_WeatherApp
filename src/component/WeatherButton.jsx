import { Button } from 'react-bootstrap'
import React from 'react'


const WeatherButton = ({cities,setCity}) => {

  console.log('cities',cities)
  return (
    <div className='weather-button'>
      <Button variant="warning" >Current Location</Button>

      {cities.map((item)=>(
        <Button variant='warning' onClick={()=>setCity(item)}>{item}</Button>
      ))}
    </div>
  )
}

export default WeatherButton
