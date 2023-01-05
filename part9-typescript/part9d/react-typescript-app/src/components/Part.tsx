import React from 'react'

const Part = ({ part }: { part: any }) => {
  switch (part.type) {
    case 'normal':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>

          <p>{part.description}</p>
        </div>
      )
      break
    case 'groupProject':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      )
      break
    case 'submission':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>{part.description}</p>
          <p>{part.exerciseSubmissionLink}</p>
        </div>
      )
    case 'special':
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <em>{part.description}</em>
          <p>{part.requirements.map((item: string) => item).join(', ')}</p>
        </div>
      )
  }

  return null
}

export default Part
