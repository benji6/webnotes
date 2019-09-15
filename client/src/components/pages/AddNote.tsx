import { RouteComponentProps, NavigateFn } from '@reach/router'
import * as React from 'react'
import { Fab, Icon, TextArea, PaperGroup, Paper, requiredValidator } from 'eri'
import { Formik, Form, Field, FieldProps } from 'formik'
import useRedirectUnAuthed from '../hooks/useRedirectUnAuthed'
import useNotePlaceholder from '../hooks/useNotePlaceholder'
import { useNotes } from '../containers/Notes'
import { INoteLocal } from '../../types'

interface IFormValues {
  body: string
}

const bodyFieldName = 'body'

export default function AddNote({ navigate }: RouteComponentProps) {
  useRedirectUnAuthed()
  const [, setNotes] = useNotes()
  const placeholder = useNotePlaceholder()

  const handleSubmit = async ({ body }: IFormValues) => {
    const dateCreated = new Date().toISOString()
    const note: INoteLocal = {
      body: body.trim(),
      dateCreated,
      dateUpdated: dateCreated,
      syncState: 'created',
    }
    setNotes(notes => (notes ? [note, ...notes] : [note]))
    ;(navigate as NavigateFn)('/')
  }

  return (
    <PaperGroup>
      <Paper>
        <h2>Add note</h2>
        <Formik initialValues={{ body: '' }} onSubmit={handleSubmit}>
          <Form noValidate>
            <Field name={bodyFieldName} validate={requiredValidator}>
              {({ field, form }: FieldProps<IFormValues>) => (
                <TextArea
                  {...field}
                  error={
                    form.submitCount && form.touched.body && form.errors.body
                  }
                  label="Note"
                  placeholder={placeholder}
                  rows={14}
                />
              )}
            </Field>
            <Field name={bodyFieldName}>
              {({ field: { value } }: FieldProps<IFormValues>) => (
                <Fab
                  aria-label="save"
                  hide={!value.trim()}
                  onClick={() => handleSubmit({ body: value })}
                >
                  <Icon name="save" size="4" />
                </Fab>
              )}
            </Field>
          </Form>
        </Formik>
      </Paper>
    </PaperGroup>
  )
}
