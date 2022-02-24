import { useState, useEffect } from 'react';
import personService from './services/persons';
import './index.css';

const Filter = ({ query, handleQueryChange }) => (
  <div>
    <p>
      filter shown with
      <input value={query} onChange={handleQueryChange} />
    </p>
  </div>
);

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => (
  <form onSubmit={addPerson}>
    <div>
      name:
      <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number:
      <input value={newNumber} onChange={handleNumberChange} />
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

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="success">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState(persons);
  const [successMessage, setSuccessMessage] = useState(null);

  const showSuccessMessage = (content) => {
    setSuccessMessage(content);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const clearForm = () => {
    setNewName('');
    setNewNumber('');
  };

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
      id:
        Math.max.apply(
          Math,
          persons.map((person) => person.id)
        ) + 1,
    };

    const result = persons.filter(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    if (result.length >= 1) {
      const oldPerson = result[0];
      oldPerson.number = newNumber;
      if (
        window.confirm(
          `${oldPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService.update(oldPerson.id, oldPerson).then((data) => {
          setPersons(
            persons.map((person) => (person.id != oldPerson.id ? person : data))
          );
          clearForm();
          showSuccessMessage(`Changed ${oldPerson.name}'s number`);
        });
      }
    } else {
      personService.create(newPerson).then((data) => {
        setPersons(persons.concat(newPerson));
        clearForm();
        showSuccessMessage(`Added ${newPerson.name}`);
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
        showSuccessMessage(`Deleted ${name}`);
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
      <SuccessNotification message={successMessage} />
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
