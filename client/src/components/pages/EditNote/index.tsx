import { Link, NavigateFn, RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { TextArea, ButtonGroup, Button, Spinner } from 'eri'
import { Form, Field } from 'react-final-form'
import { putNote } from '../../../api'
import { NotesContext, SetNotesContext } from '../../../contexts'
import DeleteDialog from './DeleteDialog'
import useRedirectUnauthed from '../../hooks/useRedirectUnauthed'

interface IProps extends RouteComponentProps {
  dateCreated?: string
}

export default function EditNote({ dateCreated, navigate }: IProps) {
  useRedirectUnauthed()
  const notes = React.useContext(NotesContext)
  const note = (notes || []).find(note => note.dateCreated === dateCreated)
  const setNotes = React.useContext(SetNotesContext)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  if (!note) return <Spinner variant="page" />

  const handleSubmit = async ({ body }: any) => {
    setIsLoading(true)
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

  return (
    <>
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
              <Button disabled={isLoading}>Save</Button>
              <Link to="/">Cancel</Link>
              <Button
                disabled={isLoading}
                onClick={() => setIsDialogOpen(true)}
                sentiment="negative"
                type="button"
                variant="secondary"
              >
                Delete
              </Button>
            </ButtonGroup>
          </form>
        )}
      />
      <DeleteDialog
        dateCreated={dateCreated as string}
        navigate={navigate as NavigateFn}
        onClose={() => setIsDialogOpen(false)}
        open={isDialogOpen}
      />
    </>
  )
}
