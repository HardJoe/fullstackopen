import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ query, onChange }) => (
  <div>
    <p>
      find countries
      <input value={query} onChange={onChange} />
    </p>
  </div>
)

const Button = ({ handleClick, name, text }) => (
  <button onClick={handleClick} name={name}>
    {text}
  </button>
)

const List = ({ query, result, handleClick, shown }) => {
  if (query === '') {
    return (
      <div>
        <p>Please enter your query</p>
      </div>
    )
  }
  if (result.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
  if (result.length > 1) {
    const shownData = result[shown]
    const langs = Object.keys(shownData.languages).map((key) =>
      shownData.languages[key]
    )
    return (
      <div>
        <div>
          {result.map((country, idx) => (
            <p key={idx}>
              {country.name.common + ' '}
              <Button handleClick={handleClick} name={idx} text='show' />
            </p>
          ))}
        </div>
        <div>
          <h1>{shownData.name.common}</h1>
          <p>capital {shownData.capital}</p>
          <p>area {shownData.area}</p>
          <h4>languages:</h4>
          <ul>
            {langs.map((lang) => <li key={lang}>{lang}</li>)}
          </ul>
          <img src={shownData.flags.png} alt="flag" />
        </div>
      </div>
    )
  }
  if (result.length > 0) {
    const country = result[0]
    const langs = Object.keys(country.languages).map((key) =>
      country.languages[key]
    )
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h4>languages:</h4>
        <ul>
          {langs.map((lang) => <li key={lang}>{lang}</li>)}
        </ul>
        <img src={country.flags.png} alt="flag" />
      </div>
    )
  }
  return (
    <div>
      <p>Match not found</p>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [searchResult, setSearchResult] = useState(countries)
  const [shown, setShown] = useState(0)

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  const handleShowCountry = (event) => {
    setShown(event.target.name)
  }

  useEffect(() => {
    const result = countries.filter((country) => (
      country.name.common.toLowerCase().includes(query.toLowerCase())
    ))
    result.sort((a, b) => a.name.common.localeCompare(b.name.common))
    setSearchResult(result)
  }, [countries, query])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter query={query} onChange={handleQueryChange} />
      <List 
        query={query} 
        result={searchResult} 
        handleClick={handleShowCountry} 
        shown={shown}
      />
    </div>
  )
}

export default App