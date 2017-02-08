import React, { Component } from 'react'
import { Editor, EditorState, convertToRaw } from 'draft-js'

export default class wEditor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editorState: EditorState.createEmpty()
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(editorState) {
    //console.log(convertToRaw(editorState))

    this.setState({ editorState })
  }

  render() {
    return (
      <Editor editorState={this.state.editorState} onChange={this.onChange} />
    )
  }
}
