import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserSession,
} from 'amazon-cognito-identity-js'
import { TextField, Button, ButtonGroup } from 'eri'
import { FORM_ERROR } from 'final-form'
import * as React from 'react'
import { Form, Field } from 'react-final-form'
import { userPool } from '../../cognito'
import { SetUserEmailContext } from '../../contexts'
import { RouteComponentProps, Link, NavigateFn } from '@reach/router'
import {
  composeValidators,
  emailValidator,
  errorProp,
  requiredValidator,
} from '../../validators'
import { networkErrorMessage } from '../../constants'

const authenticate = ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<CognitoUserSession> => {
  const authenticationDetails = new AuthenticationDetails({
    Password: password,
    Username: email,
  })

  const cognitoUser = new CognitoUser({
    Pool: userPool,
    Username: email,
  })

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onFailure: reject,
      onSuccess: resolve,
    })
  })
}

export default function SignIn({ navigate }: RouteComponentProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const setUserEmail = React.useContext(SetUserEmailContext)

  const handleSubmit = async ({ email, password }: any) => {
    setIsLoading(true)
    try {
      const result = await authenticate({ email, password })
      setUserEmail(result.getIdToken().payload.email)
      ;(navigate as NavigateFn)('/')
    } catch (e) {
      setIsLoading(false)
      if (e.code === 'NetworkError')
        return {
          [FORM_ERROR]: networkErrorMessage,
        }
      return {
        [FORM_ERROR]: 'Invalid email/password',
      }
    }
  }

  return (
    <Form
      onSubmit={handleSubmit}
      render={({ handleSubmit, submitError }) => (
        <form noValidate onSubmit={handleSubmit}>
          <h2>Sign in</h2>
          <Field
            name="email"
            validate={composeValidators(requiredValidator, emailValidator)}
            render={({ input, meta }) => (
              <TextField
                {...input}
                autoComplete="email"
                error={errorProp(meta)}
                label="Email"
                type="email"
              />
            )}
          />
          <Field
            name="password"
            validate={requiredValidator}
            render={({ input, meta }) => (
              <TextField
                {...input}
                autoComplete="current-password"
                error={errorProp(meta)}
                label="Password"
                type="password"
              />
            )}
          />
          {submitError && (
            <p e-util="center">
              <small e-util="negative">{submitError}</small>
            </p>
          )}
          <ButtonGroup>
            <Button disabled={isLoading}>Sign in</Button>
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
