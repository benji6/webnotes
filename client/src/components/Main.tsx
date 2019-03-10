import * as React from 'react'
import { Spinner } from 'eri'
import { UserLoadingContext } from '../contexts'
import Router from './Router'

export default function Main() {
  const userLoading = React.useContext(UserLoadingContext)

  return <main>{userLoading ? <Spinner variant="page" /> : <Router />}</main>
}
