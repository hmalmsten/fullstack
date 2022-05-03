const Person = ({ persons, showSome }) => {
    const numbersToShow = persons.filter(person => person.name.includes(showSome))
    return (
    numbersToShow.map(person => 
        <p key={person.name}>{person.name} {person.number}</p>
    )
    )
  }
  
  export default Person