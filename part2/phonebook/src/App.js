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

const Persons = ({ searchResult, deletePerson }) => (
  <div>
    {searchResult.map((person) => (
      <p key={person.id}>
        {person.name} {person.number}
        <button name={person.name} value={person.id} onClick={deletePerson}>
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

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState(persons);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const showSuccessMessage = (content) => {
    setSuccessMessage(content);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const showErrorMessage = (content) => {
    setErrorMessage(content);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const clearForm = () => {
    setNewName('');
    setNewNumber('');
  };

  const removeDeletedPerson = (id) => {
    setPersons(
      persons.filter((person) => person !== undefined && person.id != id)
    );
  };

  const addPerson = (event) => {
    event.preventDefault();

    const result = persons.filter(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (result.length >= 1) {
      const oldPerson = result[0];
      if (
        window.confirm(
          `${oldPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const oldNumber = oldPerson.number;
        oldPerson.number = newNumber;
        personService
          .update(oldPerson.id, oldPerson)
          .then((data) => {
            setPersons(
              persons.map((person) =>
                person.id != oldPerson.id ? person : data
              )
            );
            showSuccessMessage(`Changed ${oldPerson.name}'s number`);
          })
          .catch((err) => {
            oldPerson.number = oldNumber;
            showErrorMessage(err.response.data.error);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(newPerson)
        .then((data) => {
          setPersons(persons.concat(newPerson));
          showSuccessMessage(`Added ${newPerson.name}`);
        })
        .catch((err) => {
          showErrorMessage(err.response.data.error);
        });
    }

    clearForm();
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

  const deletePerson = (event) => {
    const name = event.target.name;
    const id = event.target.value;

    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deleteId(id)
        .then((data) => {
          removeDeletedPerson(id);
          showSuccessMessage(`Deleted ${name}`);
        })
        .catch((err) => {
          removeDeletedPerson(id);
          showErrorMessage(
            `Information of ${name} has already been removed from server`
          );
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
      <ErrorNotification message={errorMessage} />
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
      <Persons searchResult={searchResult} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
