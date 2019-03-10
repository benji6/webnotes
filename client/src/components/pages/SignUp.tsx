import * as React from 'react'
import { TextField, Button, ButtonGroup } from 'eri'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { Form, Field } from 'react-final-form'
import { userPool } from '../../cognito'
import { RouteComponentProps, Link, NavigateFn } from '@reach/router'

export default function SignUp({ navigate }: RouteComponentProps) {
  const handleSubmit = ({ email, password }: any) => {
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),
    ]

    userPool.signUp(
      email,
      password,
      attributeList,
      null as any,
      (err: Error | void, result) => {
        if (err) return console.error(err)
        ;(navigate as NavigateFn)('/')
      },
    )
  }

  return (
    <Form
      onSubmit={handleSubmit}
      render={({ handleSubmit }) => (
        <form noValidate onSubmit={handleSubmit}>
          <h2>Sign up</h2>
          <Field
            name="email"
            render={({ input }) => (
              <TextField
                {...input}
                autoComplete="email"
                label="Email"
                type="email"
              />
            )}
          />
          <Field
            name="password"
            render={({ input }) => (
              <TextField {...input} label="Password" type="password" />
            )}
          />
          <ButtonGroup>
            <Button>Sign up</Button>
          </ButtonGroup>
          <p e-util="center">
            <small>
              Already have an account? <Link to="/sign-in">Sign in</Link>!
            </small>
          </p>
        </form>
      )}
    />
  )
}
