import Part from './Part'

export interface coursePart {
  name: string
  exerciseCount: number
}

const Content = (props: { courseParts: any }) => {
  return (
    <div>
      {props.courseParts.map((part: any) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  )
}

export default Content
