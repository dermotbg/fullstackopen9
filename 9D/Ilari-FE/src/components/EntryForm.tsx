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
      <h2>Add new entry</h2>
      <form onSubmit={submitEntry}>
        <div>
          Date:
          <input
          type="date"
            value={date}
            onChange={ (event) => setDate(event.target.value) }
          />
          </div>
          <div>
            Weather:
            <input
              type="radio"
              name="weather"
              value="sunny"
              onChange={ (event) => setWeather(event.target.value) }
            />
            <label htmlFor="sunny">sunny</label>
            <input
              type="radio"
              name="weather"
              value="rainy"
              onChange={ (event) => setWeather(event.target.value) }
            />
            <label htmlFor="rainy">rainy</label>
            <input
              type="radio"
              name="weather"
              value="cloudy"
              onChange={ (event) => setWeather(event.target.value) }
            />
            <label htmlFor="cloudy">cloudy</label>
            <input
              type="radio"
              name="weather"
              value="windy"
              onChange={ (event) => setWeather(event.target.value) }
            />
            <label htmlFor="windy">windy</label>
            <input
              type="radio"
              name="weather"
              value="stormy"
              onChange={ (event) => setWeather(event.target.value) }
            />
            <label htmlFor="stormy">stormy</label>
          </div>
          <div>
            Visibility: 
            <input
              type="radio"
              name="visibility"
              value="good"
              onChange={ (event) => setVisibility(event.target.value) }
            />
            <label htmlFor="good">good</label>
            <input
              type="radio"
              name="visibility"
              value="great"
              onChange={ (event) => setVisibility(event.target.value) }
            />
            <label htmlFor="great">great</label>
            <input
              type="radio"
              name="visibility"
              value="ok"
              onChange={ (event) => setVisibility(event.target.value) }
            />
            <label htmlFor="ok">ok</label>
            <input
              type="radio"
              name="visibility"
              value="poor"
              onChange={ (event) => setVisibility(event.target.value) }
            />
            <label htmlFor="poor">poor</label>
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