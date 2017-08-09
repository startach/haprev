import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getContacts } from '../../store/modules/contacts';
import { loggedIn } from '../../store/modules/user';
import ContactView from './ContactsView';

class Contacts extends Component {
  componentDidMount() {
    // TBD loggedin should come from login process and removed from here
    const { loggedIn, getContacts } = this.props;
    loggedIn(1);
    getContacts();
  }

  render() {
    const { navigation, avatar, contacts } = this.props;
    return (
      <ContactView
        navigation={navigation}
        avatar={avatar}
        contacts={contacts}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return (
    {
      avatar: state.user.user.avatar,
      contacts: state.contacts.contacts,
    }
  );
};


export default connect(mapStateToProps, { loggedIn, getContacts })(Contacts);
