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
      <p>
        You can find the source code{' '}
        <a
          href="https://github.com/benji6/webnotes"
          rel="noopener"
          target="_blank"
        >
          here
        </a>{' '}
        and if you have any ideas, feedback or bugs you can raise them{' '}
        <a
          href="https://github.com/benji6/webnotes/issues"
          rel="noopener"
          target="_blank"
        >
          here
        </a>
        .
      </p>
      <p>I hope you enjoy the app 🙂</p>
    </>
  )
}
