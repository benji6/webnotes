import * as React from 'react'
import { TextField, Button, ButtonGroup } from 'eri'
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js'
import { Form, Field } from 'react-final-form'
import { userPool } from '../../cognito'
import { SetUserEmailContext } from '../contexts'
import { RouteComponentProps, Link, NavigateFn } from '@reach/router'

export default function SignIn({ navigate }: RouteComponentProps) {
  const setUserEmail = React.useContext(SetUserEmailContext)

  const handleSubmit = ({ email, password }: any) => {
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
        setUserEmail(result.getIdToken().payload.email)
        ;(navigate as NavigateFn)('/')
      },
    })
  }

  return (
    <Form
      onSubmit={handleSubmit}
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
          <p e-util="center">
            <small>
              Don't have an account? <Link to="/sign-up">Sign up</Link>!
            </small>
          </p>
        </form>
      )}
    />
  )
}
