import { useState } from 'react'
const Countries = ({ countries, showSome, changeFilter, getWeather, weather }) => {

    const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(showSome.toLowerCase()))

    if (countriesToShow.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }


    if (countriesToShow.length === 1) {
        const country = countriesToShow[0]
        const listLanguages = Object.values(country.languages).map(lang =>
            <li key={lang}>{lang}</li>
           )

        getWeather(country.latlng)
        return (
            <div>
            <h1>{country.name.common}</h1>
            <p> capital {country.capital[0]} <br></br>
            area {country.area}</p>
            <p><b>languages:</b></p>
            <ul>
                {listLanguages}
            </ul>
            <img src={country.flags.png} alt={country.name.common}></img>
            <h2>Weather in {country.capital[0]}</h2> 
            <p>temperature {weather[0]} Celcius <br></br>
            <img src={weather[2]} alt={country.name.common}></img> <br></br>
            wind {weather[1]} m/s
            </p>
            </div>
        )
}
    return (
        countriesToShow.map(country => 
        <p key={country.name.common}>{country.name.common} <button onClick={async () => {await changeFilter(country.name.common);}}>show</button></p>
    )
    )
  }
  
  export default Countries