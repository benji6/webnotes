import { RouteComponentProps, NavigateFn } from '@reach/router'
import * as React from 'react'
import { Fab, Icon, TextArea } from 'eri'
import { Form, Field } from 'react-final-form'
import { postNote } from '../../api'
import useRedirectUnauthed from '../hooks/useRedirectUnauthed'
import useNotePlaceholder from '../hooks/useNotePlaceholder'
import { FORM_ERROR } from 'final-form'
import { requiredValidator, errorProp } from '../../validators'
import { networkErrorMessage } from '../../constants'
import { useNotes } from '../containers/Notes'

const bodyFieldName = 'body'

export default function AddNote({ navigate }: RouteComponentProps) {
  useRedirectUnauthed()
  const [isLoading, setIsLoading] = React.useState(false)
  const [, setNotes] = useNotes()
  const placeholder = useNotePlaceholder()

  const handleSubmit = async (noteData: { body: string }) => {
    setIsLoading(true)
    try {
      const note = await postNote(noteData)
      setNotes(notes => (notes ? [note, ...notes] : [note]))
      ;(navigate as NavigateFn)('/')
    } catch (e) {
      setIsLoading(false)
      return {
        [FORM_ERROR]: networkErrorMessage,
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
            {({ input: { value } }) => (
              <Fab aria-label="save" disabled={isLoading} hide={!value}>
                <Icon name="save" size="4" />
              </Fab>
            )}
          </Field>
        </form>
      )}
    />
  )
}
