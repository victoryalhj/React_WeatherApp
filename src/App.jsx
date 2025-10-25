import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import { ClipLoader } from "react-spinners";
const apiKey = import.meta.env.VITE_API_KEY;

//1.앱을 실행하자마자 현재위치기반의 날씨가 보인다
//2.날씨정보에는 도씨,섭씨,화씨 날씨상태정보
//3.5개의 버튼(1개는 현재위치, 4개는 다른도시)
//4.도시버튼을 클릭할때마다 도시별 날씨가 나온다
//5.현재위치버튼을 누르면 다시 현재위치기반의 날씨가 나온다
//6.로딩스피너
// api숨기기

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const cities = ["london", "new york", "seoul", "tokyo"];
  const [loading, setLoading] = useState(false);
  const [apiError,setApiError] = useState("");

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      // console.log('현재위치',lat,lon)
      getWeatherByCurrentLocation(lat, lon);
    });
  };
  const getWeatherByCurrentLocation = async (lat, lon) => {
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      // console.log("data",data)
      setWeather(data);
      setLoading(false);
      }catch(err){
        setApiError(err.message)
        setLoading(false)
      }   
  };

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity("");
    } else {
      setCity(city);
    }
  };

  const getWeatherByCity = async () => {
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      // console.log('data',data)
      setWeather(data);
      setLoading(false);
    }catch(err){
      console.log(err)
      setApiError(err.message)
      setLoading(false)
    }
  };

  useEffect(() => {
    if (city == "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div className="background-box">
      {loading ? (
        <div className="weather-container">
          <ClipLoader
            color="#f88c6b"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : !apiError ? (
        <div className="weather-container">
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities}
            handleCityChange={handleCityChange}
            selectedCity={city}
          />
        </div>
      ): (
        apiError
      )}
    </div>
  );
}

export default App;
