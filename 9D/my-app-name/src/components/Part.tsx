import { CoursePart } from "../types"

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
}

const Part = ({ course }: { course: CoursePart }) => {
  switch (course.kind) {
      case 'basic':
          return (
            <div>
              <p><strong>{course.name} {course.exerciseCount}</strong></p>
              <em>{course.description}</em>
            </div>
          )
        case 'group':
          return (
            <div>
              <p><strong>{course.name} {course.exerciseCount}</strong></p>
              <p>Group Project Count: {course.groupProjectCount}</p>
            </div>
          )
        case 'background':
          return (
            <div>
              <p><strong>{course.name} {course.exerciseCount}</strong></p>
              <em>{course.description}</em>
              <p>Background Material: {course.backgroundMaterial}</p>
            </div>
          )
          case 'special':
            return (
              <div>
                <p><strong>{course.name} {course.exerciseCount}</strong></p>
                <p>Requirements: {course.requirements.map(r => <em key={r}>{`${r} `}</em>)}</p>
              </div>
            )  
      default:
        assertNever(course)
        break;
    }
}
export default Part