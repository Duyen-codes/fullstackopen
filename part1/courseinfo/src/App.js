const Header = (props) => {
  console.log("Header props:", props);
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  console.log("Content props:", props);
  return (
    <div>
      {props.parts.map((part) => {
        return <Part name={part.name} exerciseNumber={part.exercises} />;
      })}
    </div>
  );
};

const Part = (props) => {
  console.log("Part component", props);
  return (
    <p>
      {props.name} {props.exerciseNumber}{" "}
    </p>
  );
};

const Total = (props) => {
  console.log("Total props:", props);
  return (
    <p>
      Number of exercises
      {props.parts.reduce(function (sum, current) {
        return sum + current.exercises;
      }, 0)}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
