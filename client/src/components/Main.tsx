import { Main as EriMain, Spinner } from 'eri'
import * as React from 'react'
import Router from './Router'
import { StateContext } from './AppState'

export default function Main() {
  const state = React.useContext(StateContext)
  return <EriMain>{state.isUserLoading ? <Spinner /> : <Router />}</EriMain>
}
