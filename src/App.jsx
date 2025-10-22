import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//1.앱을 실행하자마자 현재위치기반의 날씨가 보인다
//2.날씨정보에는 도씨,섭씨,화씨 날씨상태정보
//3.5개의 버튼(1개는 현재위치, 4개는 다른도시)
//4.도시버튼을 클릭할때마다 도시별 날씨가 나온다
//5.현재위치버튼을 누르면 다시 현재위치기반의 날씨가 나온다
//6.로딩스피너
// api숨기기

const apiKey = import.meta.env.VITE_API_KEY;

function App() {
  // const [count, setCount] = useState(0)
  const getCurrentLocation=()=>{
   navigator.geolocation.getCurrentPosition((position)=>{
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    // console.log('현재위치',lat,lon)
    getWeatherByCurrentLocation(lat,lon)
   });
  }
  const getWeatherByCurrentLocation = async(lat,lon)=>{
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    let response = await fetch(url)
    let data = await response.json();
    console.log("data",data)
  }

  useEffect(()=>{
    getCurrentLocation()
  },[])

  return (
    <div>
      안녕~~~~~~
    </div>
  )
}

export default App
