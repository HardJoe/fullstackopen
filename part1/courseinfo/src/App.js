const Curriculum = ({ name }) => (
  <div>
    <h1>{name}</h1>
  </div>
)

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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Curriculum name="Web development curriculum" />
      {courses.map(course =>
        <Course key={course.id} course={course} />
      )}
    </div>
  )
}

export default App