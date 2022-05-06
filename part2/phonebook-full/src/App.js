import { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import axios from 'axios'
import numberService from './services/persons'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showSome, setShowSome] = useState('')
  const [message, setMessage] = useState([null, false])

  useEffect(() => {
    console.log('effect')
    numberService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'numbers')

  const addNumber = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target, newName)
    console.log(persons.some(e => e.name === newName))
    if (persons.some(e => e.name === newName)) {
      if (window.confirm(newName+" is already added to the phonebook, replace the old number with the new one?")) {
      const pnumber = persons.find(p => p.name === newName)
      const changedNumber = {...pnumber, number: newNumber}
      numberService
        .update(pnumber.id, changedNumber)
        .then(response => {
          numberService
          .getAll()
          .then(response => {
            setPersons(response.data)
          })
        })
    } else {
      setNewName('')
      setNewNumber('')
    }
    } else {
    const nameObject = {
      name: newName,
      number: newNumber
    }
    numberService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setMessage(["Added "+nameObject.name, false])
        setTimeout(() => {
          setMessage([null, false])
        }, 4000)
        setNewName('')
        setNewNumber('')
        
    })
  }
  }
  
  const deletePerson = (id, name) => {
    numberService
      .del(id)
      .then(response => {
        numberService
          .getAll()
          .then(response => {
            setPersons(response.data)
         })
      }).catch(error => {
        console.log('fail')
        setMessage(['Information of '+name+' has already been removed from the server', true])
        numberService
          .getAll()
          .then(response => {
            setPersons(response.data)
      })
      setTimeout(() => {
        setMessage([null, false])
      }, 4000)
      })
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
      <Notification message={message[0]} err={message[1]} />
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
        <Person persons={persons} showSome={showSome} deletePerson={deletePerson}/>
      </div>
    </div>
  )
}

export default App