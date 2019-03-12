import * as React from 'react'
import { TextField, Button, ButtonGroup } from 'eri'
import { CognitoUser } from 'amazon-cognito-identity-js'
import { Form, Field } from 'react-final-form'
import { userPool } from '../../cognito'
import { RouteComponentProps, NavigateFn } from '@reach/router'
import {
  requiredValidator,
  errorProp,
  composeValidators,
  emailValidator,
} from '../../validators'
import { FORM_ERROR } from 'final-form'

const confirmRegistration = ({
  code,
  cognitoUser,
}: {
  code: string
  cognitoUser: CognitoUser
}) =>
  new Promise((resolve, reject) =>
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    }),
  )

export default function VerifyUser({ navigate }: RouteComponentProps) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async ({ code, email }: any) => {
    setIsLoading(true)
    const cognitoUser = new CognitoUser({
      Pool: userPool,
      Username: email,
    })

    try {
      await confirmRegistration({ code, cognitoUser })
      ;(navigate as NavigateFn)('/')
    } catch (e) {
      setIsLoading(false)
      if (e.code === 'NetworkError')
        return {
          [FORM_ERROR]: 'Network error, please check your internet connection',
        }
      if (e.code === 'NotAuthorizedException')
        return {
          [FORM_ERROR]:
            'Invalid email/code, please check the data you have entered or request a new code',
        }
      return {
        [FORM_ERROR]:
          'Something has gone wrong, please check the data you have entered and try again',
      }
    }
  }

  return (
    <Form
      onSubmit={handleSubmit}
      render={({ handleSubmit, submitError }) => (
        <form noValidate onSubmit={handleSubmit}>
          <h2>Verify account</h2>
          <p>Enter your email and verification code here</p>
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
            name="code"
            validate={requiredValidator}
            render={({ input, meta }) => (
              <TextField
                {...input}
                error={errorProp(meta)}
                label="Verification code"
              />
            )}
          />
          {submitError && (
            <p e-util="center">
              <small e-util="negative">{submitError}</small>
            </p>
          )}
          <ButtonGroup>
            <Button disabled={isLoading}>Verify</Button>
          </ButtonGroup>
        </form>
      )}
    />
  )
}
