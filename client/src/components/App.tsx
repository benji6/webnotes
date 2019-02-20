import { Header } from 'eri'
import * as React from 'react'
import Note from './Note'
import Notes from './Notes'
import SignIn from './SignIn'
import SignUp from './SignUp'
import VerifyUser from './VerifyUser'

export default function App() {
  return (
    <>
      <Header>
        <h1>Webnotes</h1>
      </Header>
      <main>
        <h2>About</h2>
        <p>A web app for notes that's under construction.</p>
        <Note />
        <SignIn />
        <SignUp />
        <VerifyUser />
        <Notes />
      </main>
    </>
  )
}
