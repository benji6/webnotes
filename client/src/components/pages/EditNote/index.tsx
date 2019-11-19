import { NavigateFn, Redirect, RouteComponentProps } from '@reach/router'
import * as React from 'react'
import {
  Button,
  ButtonGroup,
  Fab,
  Icon,
  Paper,
  PaperGroup,
  requiredValidator,
  TextArea,
} from 'eri'
import DeleteDialog from './DeleteDialog'
import useNotePlaceholder from '../../hooks/useNotePlaceholder'
import useRedirectUnAuthed from '../../hooks/useRedirectUnAuthed'
import { useNotes } from '../../containers/Notes'
import { INoteLocal } from '../../../types'
import useKeyboardSave from '../../hooks/useKeyboardSave'

interface IProps extends RouteComponentProps {
  dateCreated?: string
}

export default function EditNote({ dateCreated, navigate }: IProps) {
  useRedirectUnAuthed()
  const [notes, setNotes] = useNotes()
  const note = (notes || []).find(note => note.dateCreated === dateCreated)
  if (!note) return <Redirect to="/" />
  const [textAreaValue, setTextAreaValue] = React.useState(note.body)
  const [textAreaError, setTextAreaError] = React.useState<string | undefined>()
  const [hasSubmitted, setHasSubmitted] = React.useState(false)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const placeholder = useNotePlaceholder()

  const handleSubmit = async () => {
    const body = textAreaValue.trim()
    const fieldError = requiredValidator(body)
    if (fieldError) {
      setHasSubmitted(true)
      setTextAreaError(fieldError)
      return
    }
    const newNote: INoteLocal = {
      body,
      dateCreated: dateCreated as string,
      dateUpdated: new Date().toISOString(),
      syncState: 'updated',
    }
    setNotes(notes => {
      if (!notes) return [newNote]
      const index = notes.findIndex(
        ({ dateCreated }) => newNote.dateCreated === dateCreated,
      )
      return [newNote, ...notes.slice(0, index), ...notes.slice(index + 1)]
    })
    ;(navigate as NavigateFn)('/')
  }

  useKeyboardSave(handleSubmit)

  return (
    <PaperGroup>
      <Paper>
        <h2>Edit note</h2>
        <p>
          <small>
            Created: {new Date(note.dateCreated).toLocaleDateString()}
          </small>
          ,{' '}
          <small>
            last updated: {new Date(note.dateUpdated).toLocaleDateString()}
          </small>
        </p>
        <form
          noValidate
          onSubmit={e => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <TextArea
            error={textAreaError}
            label="Note"
            onChange={({ target: { value } }) => {
              setTextAreaValue(value)
              if (hasSubmitted) {
                const error = requiredValidator(value)
                if (error !== textAreaError) setTextAreaError(error)
              }
            }}
            placeholder={placeholder}
            rows={14}
            value={textAreaValue}
          />
          <Fab
            aria-label="save"
            hide={!textAreaValue.trim() || textAreaValue.trim() === note.body}
            onClick={handleSubmit}
          >
            <Icon name="save" size="4" />
          </Fab>
        </form>
        <ButtonGroup>
          <Button
            danger
            onClick={() => setIsDialogOpen(true)}
            type="button"
            variant="secondary"
          >
            Delete
          </Button>
        </ButtonGroup>
        <DeleteDialog
          dateCreated={dateCreated as string}
          navigate={navigate as NavigateFn}
          onClose={() => setIsDialogOpen(false)}
          open={isDialogOpen}
        />
      </Paper>
    </PaperGroup>
  )
}
