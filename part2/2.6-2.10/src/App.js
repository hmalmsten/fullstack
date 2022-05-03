import { useState } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: "040-1234567" }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showSome, setShowSome] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target, newName)
    console.log(persons.some(e => e.name === newName))
    if (persons.some(e => e.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
    const nameObject = {
      name: newName,
      number: newNumber
    }
  
    setPersons(persons.concat(nameObject))
    setNewName('')
  }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setShowSome(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter showSome={showSome} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
      newName = {newName}
      newNumber = {newNumber}
      handleNameChange = {handleNameChange}
      handleNumberChange = {handleNumberChange}
      addNumber = {addNumber}
      />
      <h2>Numbers</h2>
      <div>
        <Person persons={persons} showSome={showSome}/>
      </div>
    </div>
  )
}

export default App