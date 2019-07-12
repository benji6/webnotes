import { Paper, PaperGroup } from 'eri'
import * as React from 'react'
import Router from './Router'

export default function Main() {
  return (
    <main>
      <PaperGroup>
        <Paper>
          <Router />
        </Paper>
      </PaperGroup>
    </main>
  )
}
