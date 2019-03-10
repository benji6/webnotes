import * as React from 'react'
import { TextField, Button, ButtonGroup } from 'eri'
import { CognitoUser } from 'amazon-cognito-identity-js'
import { Form, Field } from 'react-final-form'
import { userPool } from '../../cognito'
import { RouteComponentProps, NavigateFn } from '@reach/router'

export default function VerifyUser({ navigate }: RouteComponentProps) {
  const handleSubmit = ({ code, email }: any) => {
    const cognitoUser = new CognitoUser({
      Pool: userPool,
      Username: email,
    })

    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) return console.error(err)
      ;(navigate as NavigateFn)('/')

      // TODO
      console.log('call result: ' + result)
    })
  }

  return (
    <Form
      onSubmit={handleSubmit}
      render={({ handleSubmit }) => (
        <form noValidate onSubmit={handleSubmit}>
          <h2>Verify account</h2>
          <p>Enter your verification code here</p>
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
            name="code"
            render={({ input }) => (
              <TextField {...input} label="Verification code" />
            )}
          />
          <ButtonGroup>
            <Button>Verify</Button>
          </ButtonGroup>
        </form>
      )}
    />
  )
}
