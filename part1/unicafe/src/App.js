import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ text, count }) => (
  <p>{text} {count}</p>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const average = (total === 0) ? 0 : (good - bad) / total
  const positive = (total === 0) ? 0 : (good / total * 100) + " %"

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      
      <h1>statistics</h1>
      <Statistics text="good" count={good} />
      <Statistics text="neutral" count={neutral} />
      <Statistics text="bad" count={bad} />
      <Statistics text="all" count={total} />
      <Statistics text="average" count={average} />
      <Statistics text="positive" count={positive} />
    </div>
  )
}

export default App