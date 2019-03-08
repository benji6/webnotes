import { Link, NavigateFn } from '@reach/router'
import * as React from 'react'
import { TextArea, ButtonGroup, Button } from 'eri'
import { Form, Field } from 'react-final-form'
import { postNote } from '../../api'
import { SetNotesContext } from '../contexts'

interface IProps {
  navigate: NavigateFn
}

export default function AddNote({ navigate }: IProps) {
  const [isAdding, setIsAdding] = React.useState(false)
  const setNotes = React.useContext(SetNotesContext)
  const handleSubmit = async (noteData: { body: string }) => {
    setIsAdding(true)
    const note = await postNote(noteData)
    setNotes(notes => (notes ? [note, ...notes] : [note]))
    navigate('/')
  }
  return (
    <Form
      onSubmit={handleSubmit as any}
      render={({ handleSubmit }) => (
        <form noValidate onSubmit={handleSubmit}>
          <h2>Add note</h2>
          <Field
            name="body"
            render={({ input }) => <TextArea {...input} label="Note" />}
          />
          <ButtonGroup>
            <Button disabled={isAdding}>Add note</Button>
            <Link to="/">Cancel</Link>
          </ButtonGroup>
        </form>
      )}
    />
  )
}
