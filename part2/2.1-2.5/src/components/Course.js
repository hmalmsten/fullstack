import React from 'react'

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  const justExercises = parts.map(part => part.exercises)
  const total = justExercises.reduce((s, p) =>  s + p)
  return (<b><p>Total of {total} exercises</p></b>)
}

const Part = ({ part }) =>{ 
  return (
  <p>
    {part.name} {part.exercises}
  </p>
  )
}

const Content = ({ parts }) => {
  const value = parts.map(part => <Part part={part}/>)
  return(
  value
  )
}

const Course = (props) => {
  const { course } = props
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course