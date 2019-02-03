import { Card, CardGroup } from 'eri'
import * as React from 'react'
import { apiUri } from '../constants'

export default class Notes extends React.PureComponent {
  state = {
    notes: [],
  }

  async componentDidMount() {
    const response = await fetch(`${apiUri}/notes`)
    const notes = await response.json()
    this.setState({ notes })
  }

  render() {
    return (
      <>
        <h2>Notes</h2>
        <CardGroup>
          {this.state.notes.map(({ id, body }) => (
            <Card key={id} e-util="pre-line">
              {body}
            </Card>
          ))}
        </CardGroup>
      </>
    )
  }
}
