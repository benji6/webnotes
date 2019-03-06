import { Link } from '@reach/router'
import * as React from 'react'
import { TextArea, ButtonGroup, Button } from 'eri'
import { Form, Field } from 'react-final-form'
import { putNote } from '../../api'

interface IProps {
  dateCreated: string
}

export default function EditNote({ dateCreated }: IProps) {
  return (
    <Form
      onSubmit={({ body }: any) => putNote({ body, dateCreated }) as any}
      render={({ handleSubmit }) => (
        <form noValidate onSubmit={handleSubmit}>
          <h2>Edit note</h2>
          <Field
            name="body"
            render={({ input }) => <TextArea {...input} label="Note" />}
          />
          <ButtonGroup>
            <Button>Save</Button>
            <Link to="/">Cancel</Link>
          </ButtonGroup>
        </form>
      )}
    />
  )
}
