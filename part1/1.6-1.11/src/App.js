import { useState } from 'react'

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  const average = (props.good-props.bad) /all
  const positive = (props.good / all) * 100
  return (
    <table>
      <tbody>
      <StatisticLine text="good" value = {props.good}/>
      <StatisticLine text="neutral" value = {props.neutral}/>
      <StatisticLine text="bad" value = {props.bad}/>
      <StatisticLine text="all" value = {all}/>
      <StatisticLine text="average" value = {average}/>
      <StatisticLine text="positive" value = {positive}/>
      </tbody>
    </table>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({value, text}) => {
  if (text == "positive")
  return (
  <tr>
    <td> {text} </td>
    <td> {value} % </td>
  </tr>
  )
  else return (
    <tr>
    <td> {text} </td>
    <td> {value} </td>
  </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }


  return (
    <div>
      <h1>
        give feedback
      </h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>
        statistics
      </h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App