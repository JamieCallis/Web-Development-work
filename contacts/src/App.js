import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'


class App extends Component {
  state = {
    contacts: [

    ]
  }

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({contacts})
    })
  }

  removeContact = (contact) => {
    this.setState((state) => ({ // argument 1 : current state
      // if your updating the new state based off the current state then use function method
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))
    ContactsAPI.remove(contact)
    // this.setState({
    //   // otherwise you object method
    // })
  }

  createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([ contact ])
      }))
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListContacts
          contacts={this.state.contacts}
          onDeleteContact={this.removeContact}
          />
        )}/>
        <Route path="/create" render={({ history }) => (
          <CreateContact
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}
            />
        )}/>
      </div>
    )
  }
}

export default App;
