export interface coursePart {
  name: string
  exerciseCount: number
}

const Content = ({ courseParts }: { courseParts: Array<coursePart> }) => {
  return (
    <div>
      {courseParts.map((coursePart) => (
        <li key={coursePart.name}>
          {coursePart.name} {coursePart.exerciseCount}
        </li>
      ))}
    </div>
  )
}

export default Content
