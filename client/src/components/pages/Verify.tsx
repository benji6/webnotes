import { Link, RouteComponentProps } from '@reach/router'
import * as React from 'react'

export default function Verify(_: RouteComponentProps) {
  return (
    <>
      <h2>Verification email sent!</h2>
      <p>We've just sent you an email to verify your email address.</p>
      <p>
        Check your email and follow the link to confirm your email address. When
        you're finished come back to Webnotes to sign in and get started!
      </p>
      <p e-util="center">
        <small>
          Can't find our email? Check your junk folder or{' '}
          <Link to="/resend-verification">resend the verification email</Link>.
        </small>
      </p>
    </>
  )
}
