import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderWidth:1
  },
});

class ContactDetailsView extends Component {
  render() {
    const { name, tel, email } = this.props;
    return (
      <View style={styles.container}>
        <Text>{name}</Text>
        <Text>{tel}</Text>
        <Text>{email}</Text>
      </View>
    );
  }
}

export default ContactDetailsView;
