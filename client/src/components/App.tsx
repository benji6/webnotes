import * as React from 'react'
import Notes from './Notes'
import SignIn from './SignIn'
import SignUp from './SignUp'
import VerifyUser from './VerifyUser'

export default function App() {
  return (
    <>
      <main>
        <h1>Webnotes</h1>
        <h2>About</h2>
        <p>A web app for notes that's under construction.</p>
        <SignIn />
        <SignUp />
        <VerifyUser />
        <Notes />
      </main>
    </>
  )
}
