interface ContentProps {
  courseParts: Array<courseParts>
}

type courseParts = {
  name: string
  exerciseCount: number
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map(p => {
        return (
          <p>
            {p.name} {p.exerciseCount}
          </p>
        )
      })}
    </>
  )
}

export default Content