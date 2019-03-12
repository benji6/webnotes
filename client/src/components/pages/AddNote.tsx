import { Link, RouteComponentProps, NavigateFn } from '@reach/router'
import * as React from 'react'
import { TextArea, ButtonGroup, Button } from 'eri'
import { Form, Field } from 'react-final-form'
import { postNote } from '../../api'
import { SetNotesContext } from '../../contexts'
import useRedirectUnauthed from '../hooks/useRedirectUnauthed'
import { FORM_ERROR } from 'final-form'
import { requiredValidator, errorProp } from '../../validators'

export default function AddNote({ navigate }: RouteComponentProps) {
  useRedirectUnauthed()
  const [isLoading, setIsLoading] = React.useState(false)
  const setNotes = React.useContext(SetNotesContext)
  const handleSubmit = async (noteData: { body: string }) => {
    setIsLoading(true)
    try {
      const note = await postNote(noteData)
      setNotes(notes => (notes ? [note, ...notes] : [note]))
      ;(navigate as NavigateFn)('/')
    } catch (e) {
      setIsLoading(false)
      return {
        [FORM_ERROR]:
          'Something went wrong, please check your internet connection and try again',
      }
    }
  }

  return (
    <Form
      onSubmit={handleSubmit as any}
      render={({ handleSubmit, submitError }) => (
        <form noValidate onSubmit={handleSubmit}>
          <h2>Add note</h2>
          <Field
            name="body"
            validate={requiredValidator}
            render={({ input, meta }) => (
              <TextArea
                {...input}
                error={errorProp(meta)}
                label="Note"
                rows={12}
              />
            )}
          />
          {submitError && (
            <p e-util="center">
              <small e-util="negative">{submitError}</small>
            </p>
          )}
          <ButtonGroup>
            <Button disabled={isLoading}>Add note</Button>
            <Link to="/">Cancel</Link>
          </ButtonGroup>
        </form>
      )}
    />
  )
}
