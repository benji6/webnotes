import { NavigateFn, RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Button, ButtonGroup, Fab, Icon, Spinner, TextArea } from 'eri'
import { Form, Field } from 'react-final-form'
import { putNote } from '../../../api'
import { NotesContext, SetNotesContext } from '../../../contexts'
import DeleteDialog from './DeleteDialog'
import useNotePlaceholder from '../../hooks/useNotePlaceholder'
import useRedirectUnauthed from '../../hooks/useRedirectUnauthed'
import { FORM_ERROR } from 'final-form'
import { requiredValidator, errorProp } from '../../../validators'
import { networkErrorMessage } from '../../../constants'

interface IProps extends RouteComponentProps {
  dateCreated?: string
}

const bodyFieldName = 'body'

export default function EditNote({ dateCreated, navigate }: IProps) {
  useRedirectUnauthed()
  const notes = React.useContext(NotesContext)
  const note = (notes || []).find(note => note.dateCreated === dateCreated)
  const setNotes = React.useContext(SetNotesContext)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const placeholder = useNotePlaceholder()

  if (!note) return <Spinner variant="page" />

  const handleSubmit = async ({ body }: any) => {
    setIsLoading(true)
    try {
      const newNote = await putNote({
        body,
        dateCreated: dateCreated as string,
      })
      setNotes(notes => {
        if (!notes) return [newNote]
        const index = notes.findIndex(
          ({ dateCreated }) => newNote.dateCreated === dateCreated,
        )
        return [newNote, ...notes.slice(0, index), ...notes.slice(index + 1)]
      })
      ;(navigate as NavigateFn)('/')
    } catch (e) {
      setIsLoading(false)
      return {
        [FORM_ERROR]: networkErrorMessage,
      }
    }
  }

  return (
    <>
      <Form
        initialValues={{ body: note.body }}
        onSubmit={handleSubmit}
        render={({ handleSubmit, submitError }) => (
          <form noValidate onSubmit={handleSubmit}>
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
            <Field
              name={bodyFieldName}
              validate={requiredValidator}
              render={({ input, meta }) => (
                <TextArea
                  {...input}
                  error={errorProp(meta)}
                  label="Note"
                  placeholder={placeholder}
                  rows={16}
                />
              )}
            />
            {submitError && (
              <p e-util="center">
                <small e-util="negative">{submitError}</small>
              </p>
            )}
            <Field name={bodyFieldName} subscription={{ value: true }}>
              {({ input: { value } }) =>
                value && value !== note.body ? (
                  <Fab aria-label="save" disabled={isLoading}>
                    <Icon name="save" size="4" />
                  </Fab>
                ) : null
              }
            </Field>
            <ButtonGroup>
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
