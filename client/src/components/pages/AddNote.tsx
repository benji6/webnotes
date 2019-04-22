import { RouteComponentProps, NavigateFn } from '@reach/router'
import * as React from 'react'
import { Fab, Icon, TextArea } from 'eri'
import { Form, Field } from 'react-final-form'
import { postNote } from '../../api'
import { SetNotesContext } from '../../contexts'
import useRedirectUnauthed from '../hooks/useRedirectUnauthed'
import { FORM_ERROR } from 'final-form'
import { requiredValidator, errorProp } from '../../validators'

const bodyFieldName = 'body'

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
            name={bodyFieldName}
            validate={requiredValidator}
            render={({ input, meta }) => (
              <TextArea
                {...input}
                error={errorProp(meta)}
                label="Note"
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
              value ? (
                <Fab aria-label="save" disabled={isLoading}>
                  <Icon name="save" size="4" />
                </Fab>
              ) : null
            }
          </Field>
        </form>
      )}
    />
  )
}
