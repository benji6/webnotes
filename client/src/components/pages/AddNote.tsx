import { RouteComponentProps, NavigateFn } from '@reach/router'
import * as React from 'react'
import { Fab, Icon, TextArea, PaperGroup, Paper, requiredValidator } from 'eri'
import useRedirectUnAuthed from '../hooks/useRedirectUnAuthed'
import useNotePlaceholder from '../hooks/useNotePlaceholder'
import { NoteLocal } from '../../types'
import useKeyboardSave from '../hooks/useKeyboardSave'
import { DispatchContext } from '../AppState'

export default function AddNote({ navigate }: RouteComponentProps) {
  useRedirectUnAuthed()
  const dispatch = React.useContext(DispatchContext)
  const placeholder = useNotePlaceholder()
  const [textAreaValue, setTextAreaValue] = React.useState('')
  const [textAreaError, setTextAreaError] = React.useState<string | undefined>()
  const [hasSubmitted, setHasSubmitted] = React.useState(false)

  const handleSubmit = async () => {
    const body = textAreaValue.trim()
    const fieldError = requiredValidator(body)
    if (fieldError) {
      setHasSubmitted(true)
      setTextAreaError(fieldError)
      return
    }
    const dateCreated = new Date().toISOString()
    const note: NoteLocal = {
      body,
      dateCreated,
      dateUpdated: dateCreated,
      syncState: 'created',
    }
    dispatch({ type: 'notes/add', payload: note })
    ;(navigate as NavigateFn)('/')
  }

  useKeyboardSave(handleSubmit)

  return (
    <PaperGroup>
      <Paper>
        <h2>Add note</h2>
        <form
          noValidate
          onSubmit={e => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <TextArea
            autoFocus
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
            hide={!textAreaValue.trim()}
            onClick={handleSubmit}
          >
            <Icon name="save" size="4" />
          </Fab>
        </form>
      </Paper>
    </PaperGroup>
  )
}
