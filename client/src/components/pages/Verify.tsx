import { Link, RouteComponentProps } from '@reach/router'
import * as React from 'react'
import useRedirectAuthed from '../hooks/useRedirectAuthed'

export default function Verify(_: RouteComponentProps) {
  useRedirectAuthed()
  return (
    <>
      <h2>Verification email sent!</h2>
      <p>Check your email and click the link to confirm your email address.</p>
      <p>
        When you're finished come back to Webnotes to sign in and get started!
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
