import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Counter = ({ text, count }) => (
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
      <Counter text="good" count={good} />
      <Counter text="neutral" count={neutral} />
      <Counter text="bad" count={bad} />
      <Counter text="all" count={total} />
      <Counter text="average" count={average} />
      <Counter text="positive" count={positive} />
    </div>
  )
}

export default App