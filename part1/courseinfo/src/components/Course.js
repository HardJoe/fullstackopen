const Header = ({ name }) => (
  <div>
    <h2>{name}</h2>
  </div>
)

const Part = ({ name, exs }) => (
  <div>
    <p>{name} {exs}</p>
  </div>
)

const Content = ({ parts }) => (
  <div>
    {parts.map(part =>
      <Part key={part.id} name={part.name} exs={part.exercises} />
    )}
  </div>
)

const Total = ({ parts }) => {
  let total = parts.map(part => part.exercises).reduce((a, b) => a + b, 0)
  return (
    <div>
      <strong>total of {total} exercise(s)</strong>
    </div>
  )
}

const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course