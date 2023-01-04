import React from 'react'

interface coursePart {
  name: string
  exerciseCount: number
}

const Total = ({ courseParts }: { courseParts: Array<coursePart> }) => {
  return (
    <div>
      <p>
        Number of exercises{' '}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
}

export default Total
