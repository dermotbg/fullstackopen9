import { CoursePart } from "../types"
import Part from "./Part"

interface ContentProps {
  courseParts: Array<CoursePart>
}


const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map(p => {
        return <Part key={p.name} course={p}/>
      })}
    </>
  )
}

export default Content