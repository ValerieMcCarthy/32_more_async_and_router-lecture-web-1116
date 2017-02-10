import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
var Router = require('react-router')

import { updateNote , destroyNote } from '../actions/'

class NoteShow extends Component {

  handleChange(event){
    //{id: 2, title: 'React', body: 'd' }
    const noteParams = {
      id: this.props.note.id,
      note: {
        body: event.target.value,
        title: this.props.note.title
      }
    }
    this.props.updateNote( noteParams )
    // This method can be responsbile for telling the store that our note has changed...

    // 1. An action creator to Update the Note...
        // That action creator should fire a request to the API to update the note...
    //   2. This component should be able to dispatch that action - we'll do this
    // using mapDispatchToProps
    //  3. Our reducer needs to be able to respond to that action type...
  }

  handleDestroy(event) {
    event.preventDefault()
    this.props.destroyNote(this.props.note.id)
    Router.browserHistory.push('/notes')
  }

  render(){
    if ( !this.props.note ) {
      return (<div>Select or Add a Note to get started...</div>)
    }

    return (
      <div>
        <h2>{ this.props.note.title }</h2>
        < input type='text' value={ this.props.note.body } onChange={this.handleChange.bind(this)}/>
        <br></br>
        <button onClick={this.handleDestroy.bind(this)}>Destroy</button>
      </div>)
  }
}

function mapStateToProps(state, ownProps){
  let note
  if (state.currentNote) {
    note = state.notes.find( note => note.id === state.currentNote )
  } else {
    note = state.notes.find( note => note.id == ownProps.params.id )
  }

  return {
    note: note
  }
}

function mapDispatchToProps(dispatch){
  return {
    updateNote: function(noteParams){
      let action = updateNote( noteParams )
      dispatch(action)
    },
    destroyNote: function(noteId) {
      let action = destroyNote(noteId)
      dispatch(action)
    }
  }
}

export default connect( mapStateToProps, mapDispatchToProps)( NoteShow )
