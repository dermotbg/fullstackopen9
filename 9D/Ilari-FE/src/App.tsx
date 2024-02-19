import { useEffect, useState } from 'react'
import { DiaryEntry } from './types'
import { getAllEntries } from './services/diaryService'
import Entry from './components/Entry'

const App = () => {

  const [entries, setEntries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    getAllEntries().then(data => setEntries(data))
  },[])

  if(!entries[0]) return <>Loading...</>

  return (
    <>
      <h2>Diary Entries</h2>
      {entries.map((e) => {
        return <Entry entry={e} key={e.id} />
      })}
    </>
  )
}

export default App
