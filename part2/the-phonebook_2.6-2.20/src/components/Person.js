const Person = ({ persons, showSome, deletePerson }) => {
    const numbersToShow = persons.filter(person => person.name.includes(showSome))
    return (
    numbersToShow.map(person => 
        <p key={person.id}>{person.name} {person.number}<button onClick={async() => {
            if (window.confirm("Delete "+person.name+"?"))deletePerson(person.id, person.name)}}>delete</button></p>
    )
    )
  }
  
  export default Person