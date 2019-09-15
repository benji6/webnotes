import { RouteComponentProps, NavigateFn } from '@reach/router'
import * as React from 'react'
import { Fab, Icon, TextArea, PaperGroup, Paper, requiredValidator } from 'eri'
import { Form, Field, FieldRenderProps } from 'react-final-form'
import useRedirectUnAuthed from '../hooks/useRedirectUnAuthed'
import useNotePlaceholder from '../hooks/useNotePlaceholder'
import { useNotes } from '../containers/Notes'
import { INoteLocal } from '../../types'
import { errorProp } from '../../utils'

const bodyFieldName = 'body'

export default function AddNote({ navigate }: RouteComponentProps) {
  useRedirectUnAuthed()
  const [, setNotes] = useNotes()
  const placeholder = useNotePlaceholder()

  const handleSubmit = async ({ body }: { body: string }) => {
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
        <Form
          onSubmit={handleSubmit as any}
          render={({ handleSubmit }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Field
                name={bodyFieldName}
                validate={requiredValidator}
                render={({
                  input,
                  meta,
                }: FieldRenderProps<string, HTMLElement>) => (
                  <TextArea
                    {...input}
                    error={errorProp(meta)}
                    label="Note"
                    placeholder={placeholder}
                    rows={14}
                  />
                )}
              />
              <Field name={bodyFieldName} subscription={{ value: true }}>
                {({ input: { value } }) => (
                  <Fab
                    aria-label="save"
                    hide={!(value && value.trim())}
                    onClick={handleSubmit as any}
                  >
                    <Icon name="save" size="4" />
                  </Fab>
                )}
              </Field>
            </form>
          )}
        />
      </Paper>
    </PaperGroup>
  )
}
