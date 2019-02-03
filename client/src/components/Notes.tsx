import { Card, CardGroup } from 'eri'
import * as React from 'react'

export default class Notes extends React.PureComponent {
  state = {
    notes: [],
  }

  async componentDidMount() {
    const response = await fetch('https://api.webnotes.link/notes')
    const notes = await response.json()
    this.setState({ notes })
  }

  render() {
    return (
      <CardGroup>
        {this.state.notes.map(({ id, body }) => (
          <Card key={id} e-util="pre-line">
            {body}
          </Card>
        ))}
      </CardGroup>
    )
  }
}
