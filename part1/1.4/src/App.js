const Header = (props) => {
  return (
      <h1>
        {props.course}
      </h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.array[0].name} exercises={props.array[0].exercises}/>
      <Part part={props.array[1].name} exercises={props.array[1].exercises}/>
      <Part part={props.array[2].name} exercises={props.array[2].exercises}/>
    </div>
  )
}

const Part = (props) => {
  return (
  <p>
    {props.part} {props.exercises}
  </p>
)
}

const Total = (props) => {
  return (
      <p>
        {props.part} {props.exercises[0].exercises + props.exercises[1].exercises + props.exercises[2].exercises}
      </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content array={parts} />
      <Total part="Number of exercises" exercises={parts} />
    </div>
  )
}

export default App