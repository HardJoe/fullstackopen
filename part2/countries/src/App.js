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

const List = ({ result }) => {
  if (result.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (result.length > 1) {
    return (
      <div>
        {result.map(country => (
          <p key={country.name.common}>{country.name.common}</p>
        ))}
      </div>
    )
  } else if (result.length > 0) {
    const country = result[0]
    const langs = Object.keys(country.languages).map(key =>
      country.languages[key]
    )
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h4>languages:</h4>
        <ul>
          {langs.map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        <img src={country.flags.png} alt="flag" />
      </div>
    )
  } else {
    return (
      <div>
        <p>Match not found</p>
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [searchResult, setSearchResult] = useState(countries)

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  useEffect(() => {
    const result = countries.filter(country => (
      country.name.common.toLowerCase().includes(query.toLowerCase())
    ))
    result.sort((a, b) => a.name.common.localeCompare(b.name.common))
    setSearchResult(result)
  }, [countries, query])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter query={query} handleQueryChange={handleQueryChange} />
      <List result={searchResult} />
    </div>
  )
}

export default App