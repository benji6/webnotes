import { Menu as EriMenu } from 'eri'
import * as React from 'react'
import { Link } from '@reach/router'

interface IProps {
  open: boolean
  handleMenuClose(): void
}

export default function Menu({ handleMenuClose, open }: IProps) {
  return (
    <EriMenu onClose={handleMenuClose} open={open}>
      <ul>
        <li>
          <Link onClick={handleMenuClose} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link onClick={handleMenuClose} to="add">
            Add note
          </Link>
        </li>
        <li>
          <Link onClick={handleMenuClose} to="about">
            About
          </Link>
        </li>
      </ul>
    </EriMenu>
  )
}
