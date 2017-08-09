import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../../app/Header';
import ContactDetail from './ContactDetailsView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class ContactsView extends Component {
  render() {
    const { navigation, avatar, contacts } = this.props;
    return (
      <View style={styles.container}>
        <Header
          caption="contacts"
          userAvatar={avatar}
          navigation={navigation}
        />
        <View>
          {
            contacts.map((contact, index) => (
              <ContactDetail
                key={index}
                name={contact.name}
                tel={contact.tel}
                email={contact.email}
              />
            ))
          }
        </View>
      </View>
    );
  }
}

export default ContactsView;
