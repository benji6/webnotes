import { Link, NavigateFn, RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { TextArea, ButtonGroup, Button, Spinner } from 'eri'
import { Form, Field } from 'react-final-form'
import { putNote } from '../../api'
import { NotesContext, SetNotesContext } from '../contexts'

interface IProps extends RouteComponentProps {
  dateCreated?: string
}

export default function EditNote({ dateCreated, navigate }: IProps) {
  const notes = React.useContext(NotesContext)
  const setNotes = React.useContext(SetNotesContext)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const note = (notes || []).find(note => note.dateCreated === dateCreated)

  const handleSubmit = async ({ body }: any) => {
    setIsSubmitting(true)
    const newNote = await putNote({ body, dateCreated: dateCreated as string })
    setNotes(notes => {
      if (!notes) return [newNote]
      const index = notes.findIndex(
        ({ dateCreated }) => newNote.dateCreated === dateCreated,
      )
      return [newNote, ...notes.slice(0, index), ...notes.slice(index + 1)]
    })
    ;(navigate as NavigateFn)('/')
  }

  return note ? (
    <Form
      initialValues={{ body: note.body }}
      onSubmit={handleSubmit}
      render={({ handleSubmit }) => (
        <form noValidate onSubmit={handleSubmit}>
          <h2>Edit note</h2>
          <Field
            name="body"
            render={({ input }) => (
              <TextArea {...input} label="Note" rows={12} />
            )}
          />
          <ButtonGroup>
            <Button disabled={isSubmitting}>Save</Button>
            <Link to="/">Cancel</Link>
          </ButtonGroup>
        </form>
      )}
    />
  ) : (
    <Spinner variant="page" />
  )
}
