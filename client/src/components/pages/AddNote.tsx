import { RouteComponentProps, NavigateFn } from '@reach/router'
import * as React from 'react'
import { Fab, Icon, TextArea } from 'eri'
import { Form, Field } from 'react-final-form'
import useRedirectUnauthed from '../hooks/useRedirectUnauthed'
import useNotePlaceholder from '../hooks/useNotePlaceholder'
import { requiredValidator, errorProp } from '../../validators'
import { useNotes } from '../containers/Notes'
import { INoteLocal } from '../../types'

const bodyFieldName = 'body'

export default function AddNote({ navigate }: RouteComponentProps) {
  useRedirectUnauthed()
  const [, setNotes] = useNotes()
  const placeholder = useNotePlaceholder()

  const handleSubmit = async (formData: { body: string }) => {
    const dateCreated = new Date().toISOString()
    const note: INoteLocal = {
      body: formData.body,
      dateCreated,
      dateUpdated: dateCreated,
      syncState: 'created',
    }
    setNotes(notes => (notes ? [note, ...notes] : [note]))
    ;(navigate as NavigateFn)('/')
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
              <Fab aria-label="save" hide={!value}>
                <Icon name="save" size="4" />
              </Fab>
            )}
          </Field>
        </form>
      )}
    />
  )
}
