import { CognitoUser } from 'amazon-cognito-identity-js'
import { TextField, Button, ButtonGroup } from 'eri'
import { FORM_ERROR } from 'final-form'
import { RouteComponentProps, Link, navigate } from '@reach/router'
import * as React from 'react'
import { Form, Field, FieldRenderProps } from 'react-final-form'
import { userPool } from '../../cognito'
import {
  composeValidators,
  emailValidator,
  requiredValidator,
  errorProp,
} from '../../validators'
import { networkErrorMessage } from '../../constants'

const resendConfirmation = ({ email }: { email: string }) =>
  new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Pool: userPool,
      Username: email,
    })
    cognitoUser.resendConfirmationCode((err, result) =>
      err ? reject(err) : resolve(result),
    )
  })

export default function ResendVerification(_: RouteComponentProps) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async ({ email }: any) => {
    setIsLoading(true)

    try {
      await resendConfirmation({ email })
      navigate('/verify')
    } catch (e) {
      setIsLoading(false)
      if (e.code === 'NetworkError')
        return {
          [FORM_ERROR]: networkErrorMessage,
        }
      if (e.code === 'UserNotFoundException')
        return {
          [FORM_ERROR]:
            'Email address has already been confirmed, please sign in',
        }
      if (e.code === 'UserNotFoundException')
        return {
          [FORM_ERROR]: 'Email address not recognised, try signing up instead',
        }
      return {
        [FORM_ERROR]:
          'Something has gone wrong, check the data you have entered and try again',
      }
    }
  }

  return (
    <Form
      onSubmit={handleSubmit}
      render={({ handleSubmit, submitError }) => (
        <form noValidate onSubmit={handleSubmit}>
          <h2>Resend verification email</h2>
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
          {submitError && (
            <p e-util="center">
              <small e-util="negative">{submitError}</small>
            </p>
          )}
          <ButtonGroup>
            <Button disabled={isLoading}>Resend</Button>
          </ButtonGroup>
          <p e-util="center">
            <small>
              Looking for the <Link to="/sign-in">Sign in</Link> or{' '}
              <Link to="/sign-up">Sign up</Link> pages?
            </small>
          </p>
        </form>
      )}
    />
  )
}
