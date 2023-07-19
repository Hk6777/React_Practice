import React, { Component } from 'react'
import ListContacts from './main//ListConstacts'
import * as ContactsApi from './util/ContactsApi'
import CreateContact from './main/CreateContact'
import { Route } from 'react-router-dom'
import './App.css';

class App extends Component {
  state = {
    contacts: []
  }
  componentDidMount() {
    ContactsApi.getAll()
      .then((contacts => {
        this.setState(() => ({ contacts }))
      }))
  }
  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c) => {
        return c.id !== contact.id
      })
    }))
    ContactsApi.remove(contact)
  }
  CreateContact = (contact) => {
    ContactsApi.create(contact)
      .then((contact) => {
        this.setState((currentState) => ({
          contacts: currentState.contacts.concat([contact])
        }))
      })
  }
  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact} />
        )} />
        <Route path='/create' render={({ history }) => (
          <CreateContact onCreateContact={(contact) => {
            this.CreateContact(contact)
            history.push('/')
          }} />
        )} />
      </div>
    )
  }
}



export default App;
