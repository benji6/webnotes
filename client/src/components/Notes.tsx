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
    return this.state.notes.map(note => <div e-util="pre-line">{note}</div>)
  }
}
