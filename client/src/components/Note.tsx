import { Card, Button, ButtonGroup, TextArea } from 'eri'
import * as React from 'react'
import { deleteNote, putNote } from '../api'
import { Field, Form } from 'react-final-form'

interface IProps {
  children: string
  dateCreated: string
}

export default function Note({ children, dateCreated }: IProps) {
  const handleDelete = () => deleteNote({ dateCreated })

  return (
    <Card e-util="pre-line">
      <p>{children}</p>
      <Form
        onSubmit={({ body }: any) => putNote({ body, dateCreated }) as any}
        render={({ handleSubmit }) => (
          <form noValidate onSubmit={handleSubmit}>
            <h2>Update note</h2>
            <Field
              name="body"
              render={({ input }) => <TextArea {...input} label="Note" />}
            />
            <ButtonGroup>
              <Button>Update note</Button>
            </ButtonGroup>
          </form>
        )}
      />
      <ButtonGroup>
        <Button onClick={handleDelete} sentiment="negative">
          Delete
        </Button>
      </ButtonGroup>
    </Card>
  )
}
