import * as React from 'react'
import { TextField, Button, ButtonGroup } from 'eri'
import { CognitoUser } from 'amazon-cognito-identity-js'
import { Form, Field } from 'react-final-form'
import { userPool } from '../constants'

export default function VerifyUser() {
  return (
    <Form
      onSubmit={({ code, email }: any) => {
        const cognitoUser = new CognitoUser({
          Pool: userPool,
          Username: email,
        })

        cognitoUser.confirmRegistration(code, true, (err, result) => {
          if (err) {
            // TODO - handle errors
            return console.error(err)
          }
          console.log('call result: ' + result)
        })
      }}
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
