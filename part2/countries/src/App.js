import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ query, handleQueryChange }) => (
  <div>
    <p>
      find countries
      <input value={query} onChange={handleQueryChange} />
    </p>
  </div>
)

const Button = ({ name, handleClick, text }) => (
  <button name={name} onClick={handleClick}>
    {text}
  </button>
)

const CountryData = ({ country }) => {
  const langs = Object.keys(country.languages).map((key) =>
    country.languages[key]
  )
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {langs.map((lang, id) => <li key={id}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt="country flag" />
    </div>
  )
}

const WeatherData = ({ weatherData, city }) => {
  const icon_link = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
  const kelvinToCelsius = (num) => {
    num -= 273
    const m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num)
  }
  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>temperature {kelvinToCelsius(weatherData.main.temp)} Celcius</p>
      <img src={icon_link} alt="weather icon" />
      <p>wind {weatherData.wind.speed} m/s</p>
    </div>
  )
}

const SingleList = ({ result, weatherData }) => {
  const country = result[0]
  return (
    <div>
      <CountryData country={country} />
      <WeatherData weatherData={weatherData} city={country.capital} />
    </div>
  )
}

const MultipleList = ({ result, handleClick, shown }) => {
  const shownData = result[shown]
  return (
    <div>
      {result.map((country, id) => (
        <p key={id}>
          {country.name.common + ' '}
          <Button name={id} handleClick={handleClick} text='show' />
        </p>
      ))}
      <CountryData country={shownData} />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [shown, setShown] = useState(0)
  const [weatherData, setWeatherData] = useState(null)

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  const handleShowCountry = (event) => {
    setShown(event.target.name)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    const result = countries.filter((country) => (
      country.name.common.toLowerCase().includes(query.toLowerCase())
    ))
    if (result.length > 1) {
      result.sort((a, b) => a.name.common.localeCompare(b.name.common))
    }
    setSearchResult(result)
  }, [countries, query])

  useEffect(() => {
    if (searchResult.length === 1) {
      const capital = searchResult[0].capital
      const api_key = process.env.REACT_APP_API_KEY
      axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
        .then((response) => {
          setWeatherData(response.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [searchResult])

  if (query === '') {
    return (
      <div>
        <Filter query={query} handleQueryChange={handleQueryChange} />
        <p>Please enter your query</p>
      </div>
    )
  }
  if (searchResult.length > 10) {
    return (
      <div>
        <Filter query={query} handleQueryChange={handleQueryChange} />
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
  if (searchResult.length > 1) {
    return (
      <div>
        <Filter query={query} handleQueryChange={handleQueryChange} />
        <MultipleList
          result={searchResult}
          handleClick={handleShowCountry}
          shown={shown}
        />
      </div>
    )
  }
  // https://www.geeksforgeeks.org/how-to-fetch-data-from-an-api-in-reactjs/
  if (searchResult.length === 1 && weatherData) {
    return (
      <div>
        <Filter query={query} handleQueryChange={handleQueryChange} />
        <SingleList result={searchResult} weatherData={weatherData} />
      </div>
    )
  }
  return (
    <div>
      <Filter query={query} handleQueryChange={handleQueryChange} />
      <p>Match not found</p>
    </div>
  )
}

export default App