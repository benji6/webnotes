import * as React from 'react'
import _404 from '../pages/_404'
import { getNotes } from '../../api'
import { INote } from '../../types'
import { NotesContext } from '../contexts'

export default function NotesContainer(props: Object) {
  const [notes, setNotes] = React.useState<INote[] | undefined>(undefined)

  React.useEffect(() => {
    getNotes().then(setNotes)
  }, [])

  return <NotesContext.Provider {...props} value={notes} />
}
