import { Router as ReachRouter } from '@reach/router'
import * as React from 'react'
import _404 from './pages/_404'
import About from './pages/About'
import AddNote from './pages/AddNote'
import EditNote from './pages/EditNote'
import Home from './pages/Home'
import ResendVerification from './pages/ResendVerification'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Verify from './pages/Verify'

export default function Router() {
  return (
    <ReachRouter>
      <_404 default />
      <Home path="/" />
      <About path="about" />
      <AddNote path="add" />
      <EditNote path="edit/:dateCreated" />
      <ResendVerification path="resend-verification" />
      <SignIn path="sign-in" />
      <SignUp path="sign-up" />
      <Verify path="verify" />
    </ReachRouter>
  )
}
