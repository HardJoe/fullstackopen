import { useState, useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')
  const [searchResult, setSearchResult] = useState(persons)
  
  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    const result = persons.filter(person => (
      person.name.toLowerCase() === newPerson.name.toLowerCase()
    ))
    if (result.length >= 1) {
      alert(`${result[0].name} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  // https://stackoverflow.com/a/58887307
  useEffect(() => {
    const result = persons.filter(person => (
      person.name.toLowerCase().includes(query.toLowerCase())
    ))
    setSearchResult(result)
  }, [persons, query])

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <p>
          filter shown with 
          <input value={query} onChange={handleQueryChange} />
        </p>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {searchResult.map(person => 
        <p key={person.id}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App