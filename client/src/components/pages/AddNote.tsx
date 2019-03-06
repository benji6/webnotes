import { Link } from '@reach/router'
import * as React from 'react'
import { TextArea, ButtonGroup, Button } from 'eri'
import { Form, Field } from 'react-final-form'
import { postNote } from '../../api'

export default function AddNote() {
  return (
    <Form
      onSubmit={postNote as any}
      render={({ handleSubmit }) => (
        <form noValidate onSubmit={handleSubmit}>
          <h2>Add note</h2>
          <Field
            name="body"
            render={({ input }) => <TextArea {...input} label="Note" />}
          />
          <ButtonGroup>
            <Button>Add note</Button>
            <Link to="/">Cancel</Link>
          </ButtonGroup>
        </form>
      )}
    />
  )
}