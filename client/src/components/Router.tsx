import { Router as ReachRouter } from '@reach/router'
import * as React from 'react'
import _404 from './pages/_404'
import About from './pages/About'
import AddNote from './pages/AddNote'
import EditNote from './pages/EditNote'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import VerifyUser from './pages/VerifyUser'

export default function Router() {
  return (
    <ReachRouter>
      <_404 default />
      <Home path="/" />
      <About path="about" />
      <AddNote path="add" />
      <EditNote path="edit/:dateCreated" />
      <SignIn path="sign-in" />
      <SignUp path="sign-up" />
      <VerifyUser path="verify-user" />
    </ReachRouter>
  )
}
