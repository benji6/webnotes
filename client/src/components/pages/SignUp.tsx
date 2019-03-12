import * as React from 'react'
import { TextField, Button, ButtonGroup } from 'eri'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { Form, Field } from 'react-final-form'
import { userPool } from '../../cognito'
import { RouteComponentProps, Link, navigate } from '@reach/router'
import {
  composeValidators,
  emailValidator,
  passwordValidator,
  requiredValidator,
  errorProp,
} from '../../validators'
import { FORM_ERROR } from 'final-form'

const signUp = ({
  attributeList,
  email,
  password,
}: {
  attributeList: CognitoUserAttribute[]
  email: string
  password: string
}) =>
  new Promise((resolve, reject) => {
    userPool.signUp(
      email,
      password,
      attributeList,
      null as any,
      (err: Error | void, result) => (err ? reject(err) : resolve(result)),
    )
  })

export default function SignUp(_: RouteComponentProps) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async ({ email, password }: any) => {
    setIsLoading(true)
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),
    ]

    try {
      await signUp({ attributeList, email, password })
      navigate('/')
    } catch (e) {
      setIsLoading(false)
      if (e.code === 'NetworkError')
        return {
          [FORM_ERROR]: 'Network error, please check your internet connection',
        }
      if (e.code === 'UsernameExistsException')
        return {
          [FORM_ERROR]: 'Username already exists, try signing in instead',
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
          <h2>Sign up</h2>
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
            validate={composeValidators(requiredValidator, passwordValidator)}
            render={({ input, meta }) => (
              <TextField
                {...input}
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
            <Button disabled={isLoading}>Sign up</Button>
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