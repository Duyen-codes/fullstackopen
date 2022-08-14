import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [message, setMessage] = useState({});
 

  useEffect(() => {
    // get
    personService.getAll().then((response) => {
      console.log(response.data);
      setPersons(response.data);
    });
  }, []);

  // add
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: Math.floor(Math.random() * 100000),
    };

    const found = persons.find(
      (person) =>
        person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
    );

    if (found) {
      const confirmResult = window.confirm(
        `is already added to the phonebook, replace the old number with the new one?`
      );
      const foundId = found.id;
      if (confirmResult === true) {
        personService.update(foundId, personObject).then((response) => {
          const personsCopy = [...persons];
          const index = persons.indexOf(found);
          personsCopy[index] = personObject;
          setPersons(personsCopy);
        });
      }
    } else {
      // create
      personService
        .create(personObject)
        .then((response) => {
          console.log(response.body);
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
          setMessage({
            content: `${personObject.name} is successfully added to the phonebook`,
            type: "success",
          });
          setTimeout(() => {
            setMessage({});
          }, 5000);
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  // delete
  const handleRemove = (person) => {
    const personId = person.id;
    const confirmResult = window.confirm(
      `Are you sure you want to delete ${person.name} from the phonebook?`
    );
    if (confirmResult === true) {
      personService
        .remove(person.id)
        .then((response) => {
          setMessage({
            content: `${person.name} is removed successfully`,
            type: "success",
          });
          setTimeout(() => {
            setMessage({});
          }, 5000);
          setPersons(persons.filter((person) => person.id !== personId));
          return response.data;
        })
        .catch((error) => {
          alert(`${person.name} was already removed the the server`);
          setPersons(persons.filter((person) => person.id !== personId));
        });
    }
  };

  const personsToShow = () => {
    if (searchFilter === "") {
      return persons;
    }
    return persons.filter((person) => {
      return person.name.toLowerCase().includes(searchFilter.toLowerCase());
    });
  };

  const handleSearchFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchFilter(searchTerm);
  };

 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchFilter={searchFilter}
        handleSearchFilter={handleSearchFilter}
      />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Notification message={message} />
      <h3>Numbers</h3>
      <ul>
        {personsToShow().map((person) => {
          return (
            <li key={person.id}>
              {person.name} {person.number}
              <button onClick={() => handleRemove(person)}>delete</button>
            </li>
          );
        })}
      </ul>

    </div>
  );
};
export default App;
