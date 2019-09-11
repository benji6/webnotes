import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserSession,
} from 'amazon-cognito-identity-js'
import { TextField, Button, ButtonGroup } from 'eri'
import { FORM_ERROR } from 'final-form'
import * as React from 'react'
import { Form, Field, FieldRenderProps } from 'react-final-form'
import { userPool } from '../../cognito'
import { RouteComponentProps, Link, NavigateFn } from '@reach/router'
import {
  composeValidators,
  emailValidator,
  errorProp,
  requiredValidator,
} from '../../validators'
import { networkErrorMessage } from '../../constants'
import { useUserEmail } from '../containers/User'
import useRedirectAuthed from '../hooks/useRedirectAuthed'

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
  useRedirectAuthed()
  const [isLoading, setIsLoading] = React.useState(false)
  const [, setUserEmail] = useUserEmail()

  const handleSubmit = async ({ email, password }: any) => {
    setIsLoading(true)
    try {
      const result = await authenticate({ email, password })
      setUserEmail(result.getIdToken().payload.email)
      ;(navigate as NavigateFn)('/')
    } catch (e) {
      setIsLoading(false)
      switch (e.code) {
        case 'NetworkError':
          return { [FORM_ERROR]: networkErrorMessage }
        case 'UserNotConfirmedException':
          return {
            [FORM_ERROR]: (
              <>
                Check your email to verify your email address or{' '}
                <Link to="/resend-verification">
                  resend the verification email
                </Link>
              </>
            ),
          }
        case 'NotAuthorizedException':
        case 'UserNotFoundException':
          return { [FORM_ERROR]: 'Incorrect email/password' }
        default:
          return {
            [FORM_ERROR]:
              'Something went wrong, check the data you have entered and try again',
          }
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
            render={({
              input,
              meta,
            }: FieldRenderProps<string, HTMLElement>) => (
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
            render={({
              input,
              meta,
            }: FieldRenderProps<string, HTMLElement>) => (
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
