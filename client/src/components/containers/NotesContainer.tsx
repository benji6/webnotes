import * as React from 'react'
import _404 from '../pages/_404'
import { getNotes } from '../../api'
import { INote } from '../../types'
import { NotesContext, SetNotesContext, UserEmailContext } from '../contexts'

export default function NotesContainer(props: Object) {
  const [notes, setNotes] = React.useState<INote[] | undefined>(undefined)
  const userEmail = React.useContext(UserEmailContext)

  React.useEffect(() => {
    getNotes().then(apiNotes =>
      setNotes(notes => (notes ? [...apiNotes, ...notes] : apiNotes)),
    )
  }, [userEmail])

  return (
    <NotesContext.Provider value={notes}>
      <SetNotesContext.Provider {...props} value={setNotes} />
    </NotesContext.Provider>
  )
}
