import { useState, useEffect } from 'react';
import personService from './services/persons';

const Filter = ({ query, handleQueryChange }) => (
  <div>
    <p>
      filter shown with
      <input value={query} onChange={handleQueryChange} />
    </p>
  </div>
);

const PersonForm = (props) => (
  <form onSubmit={props.addPerson}>
    <div>
      name:
      <input value={props.newName} onChange={props.handleNameChange} />
    </div>
    <div>
      number:
      <input value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Persons = ({ searchResult, handleDelete }) => (
  <div>
    {searchResult.map((person) => (
      <p key={person.id}>
        {person.name} {person.number}
        <button name={person.name} value={person.id} onClick={handleDelete}>
          delete
        </button>
      </p>
    ))}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState(persons);

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const result = persons.filter(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    if (result.length >= 1) {
      alert(`${result[0].name} is already added to phonebook`);
    } else {
      personService.create(newPerson).then((data) => {
        setPersons(persons.concat(data));
        setNewName('');
        setNewNumber('');
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleDelete = (event) => {
    const name = event.target.name;
    const id = event.target.value;
    if (window.confirm(`Delete ${name}?`)) {
      personService.deleteId(id).then((data) => {
        setPersons(persons.filter((person) => person.id != id));
      });
    }
  };

  // https://stackoverflow.com/a/58887307
  useEffect(() => {
    const result = persons.filter((person) =>
      person.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResult(result);
  }, [persons, query]);

  useEffect(() => {
    personService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={query} handleQueryChange={handleQueryChange} />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons searchResult={searchResult} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
