import { RouteComponentProps } from '@reach/router'
import * as React from 'react'

export default function About(_: RouteComponentProps) {
  return (
    <>
      <h2>About</h2>
      <p>
        Webnotes is a free and open source app that lets you create and manage
        notes. It's simple to use and because it runs in your browser you can
        use it across all your devices!
      </p>
      <p>It is currently under construction.</p>
    </>
  )
}
