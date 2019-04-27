import { RouteComponentProps } from '@reach/router'
import * as React from 'react'

export default function Verify(_: RouteComponentProps) {
  return (
    <>
      <h2>Verification email sent!</h2>
      <p>We've just sent you an email to verify your email address.</p>
      <p>
        Check your email (if you can't find it then it could be in your junk
        folder) and follow the link to confirm your email address. When you're
        finished come back to Webnotes to sign in and get started!
      </p>
    </>
  )
}
