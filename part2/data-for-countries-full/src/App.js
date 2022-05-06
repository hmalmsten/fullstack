import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import axios from 'axios'


const App = () => {
  const [countries, setCountries] = useState([]) 
  const [showSome, setShowSome] = useState('')
  const [weather, setWeather] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  //console.log( countries)

  const handleFilterChange = (event) => {
    setShowSome(event.target.value)
  }
  const changeFilter = (val) => setShowSome(val)

  const getWeather = (latlong) => {
    const lat = latlong[0]
    const long = latlong[1]
    const api_key = process.env.REACT_APP_API_KEY
    const api_url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid='+api_key+'&units=metric'
    //console.log("URL:", api_url)
    useEffect(() => {
     axios
      .get(api_url)
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        const responsedata = response.data
        const temperature = responsedata.main.temp
        const wind = responsedata.wind.speed
        const icon = responsedata.weather[0].icon
        const url = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        setWeather([temperature, wind, url])
      })
    }, [])
  }

  return (
    <div>
      <Filter showSome={showSome} handleFilterChange={handleFilterChange} />
      <Countries countries={countries} showSome={showSome} changeFilter={changeFilter} getWeather={getWeather} weather={weather}/>
    </div>
  )
}

export default App