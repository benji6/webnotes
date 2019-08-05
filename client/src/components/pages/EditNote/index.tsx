import { NavigateFn, Redirect, RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Button, ButtonGroup, Fab, Icon, TextArea } from 'eri'
import { Form, Field, FieldRenderProps } from 'react-final-form'
import DeleteDialog from './DeleteDialog'
import useNotePlaceholder from '../../hooks/useNotePlaceholder'
import useRedirectUnauthed from '../../hooks/useRedirectUnauthed'
import { requiredValidator, errorProp } from '../../../validators'
import { useNotes } from '../../containers/Notes'
import { INoteLocal } from '../../../types'

interface IProps extends RouteComponentProps {
  dateCreated?: string
}

const bodyFieldName = 'body'

export default function EditNote({ dateCreated, navigate }: IProps) {
  useRedirectUnauthed()
  const [notes, setNotes] = useNotes()
  const note = (notes || []).find(note => note.dateCreated === dateCreated)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const placeholder = useNotePlaceholder()

  if (!note) return <Redirect to="/" />

  const handleSubmit = async ({ body }: any) => {
    const newNote: INoteLocal = {
      body: body.trim(),
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
            {submitError && (
              <p e-util="center">
                <small e-util="negative">{submitError}</small>
              </p>
            )}
            <Field name={bodyFieldName} subscription={{ value: true }}>
              {({ input: { value } }) => (
                <Fab
                  aria-label="save"
                  hide={!value || value.trim() === note.body}
                  onClick={handleSubmit as any}
                >
                  <Icon name="save" size="4" />
                </Fab>
              )}
            </Field>
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
