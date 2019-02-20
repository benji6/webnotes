import * as React from 'react'
import { TextField, Button, ButtonGroup } from 'eri'
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js'
import { Form, Field } from 'react-final-form'
import { userPool } from '../constants'

export default function SignIn({
  setUserEmail,
}: {
  setUserEmail: React.Dispatch<React.SetStateAction<string | undefined>>
}) {
  return (
    <Form
      onSubmit={({ email, password }: any) => {
        const authenticationDetails = new AuthenticationDetails({
          Password: password,
          Username: email,
        })

        const cognitoUser = new CognitoUser({
          Pool: userPool,
          Username: email,
        })

        cognitoUser.authenticateUser(authenticationDetails, {
          onFailure: err => {
            // TODO - handle errors
            console.error(err)
          },
          onSuccess: result => {
            const accessToken = result.getAccessToken().getJwtToken()
            const { email } = result.getIdToken().payload
            setUserEmail(email)
            console.log('accessToken', accessToken)
          },
        })
      }}
      render={({ handleSubmit }) => (
        <form noValidate onSubmit={handleSubmit}>
          <h2>Sign in</h2>
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
            <Button>Sign in</Button>
          </ButtonGroup>
        </form>
      )}
    />
  )
}
