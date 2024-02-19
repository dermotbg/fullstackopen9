import { useState } from "react"
import { DiaryEntry, NewDiaryEntry } from "../types"
import { createEntry } from "../services/diaryService"

type FormProps = {
  entries: DiaryEntry[]
  setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>

}

const EntryForm = ({ entries, setEntries }: FormProps) => {

  const [error, setError] = useState<string | null>(null)
  const [date, setDate] = useState<string>('')
  const [weather, setWeather] = useState<string>('')
  const [visibility, setVisibility] = useState<string>('')
  const [comment, setComment] = useState<string>('')

  const submitEntry = (event: React.SyntheticEvent) => {
    event.preventDefault()
    
    const newEntry: NewDiaryEntry = {
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment
    } 

      createEntry(newEntry)
        .then(data => setEntries(entries.concat(data)))
        .catch(error => {
        if(error instanceof Error){
          setError(`${error}`)
        }
    })


    setDate('')
    setWeather('')
    setVisibility('')
    setComment('')
  }

  console.log
  return(
    <div>
      <form onSubmit={submitEntry}>
        <div>
          <input
            value={date}
            onChange={ (event) => setDate(event.target.value) }
            placeholder="date"
          />
          </div>
          <div>
            <input
              value={weather}
              onChange={ (event) => setWeather(event.target.value) }
              placeholder="weather"
            />
          </div>
          <div>
            <input
              value={visibility}
              onChange={ (event) => setVisibility(event.target.value) }
              placeholder="visibility"
            />
          </div>
          <div>
            <input
              value={comment}
              onChange={ (event) => setComment(event.target.value) }
              placeholder="comment"
            />
          </div>
          <button>submit</button>
      </form>
      <p style={{color: 'red'}}>{error ? error : null}</p>
    </div>
  )

}
export default EntryForm