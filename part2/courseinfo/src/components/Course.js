import React from "react";

const Header = ({ course }) => {
  return (
    <>
      <h2>{course.name}</h2>
    </>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ course }) => {
  const totalExercises = course.parts.reduce(function (sum, parts) {
    return sum + parts.exercises;
  }, 0);
  return (
    <div>
      {course.parts.map((part) => {
        return (
          <Part key={part.name} name={part.name} exercises={part.exercises} />
        );
      })}
      <strong>Total of {totalExercises} exercises</strong>
    </div>
  );
};
const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
    </>
  );
};

export default Course;
