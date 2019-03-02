import * as React from 'react'
import { TextField, Button, ButtonGroup } from 'eri'
import { CognitoUserAttribute, ISignUpResult } from 'amazon-cognito-identity-js'
import { Form, Field } from 'react-final-form'
import { userPool } from '../cognito'

export default function SignUp() {
  return (
    <Form
      onSubmit={({ email, password }: any) => {
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

            console.log(
              'user name is ' + (result as ISignUpResult).user.getUsername(),
            )
            console.log('result', result)
          },
        )
      }}
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
        </form>
      )}
    />
  )
}
