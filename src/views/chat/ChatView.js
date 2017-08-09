import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Header from '../../app/Header';

//import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class ChatView extends Component {
  render() {
    const { screenName, avatar, navigation } = this.props;
    return (
      <View style={styles.container}>
        <Header
          caption="chat"
          userAvatar={avatar}
          navigation={navigation}
        />
        <Text>
          This will be {screenName} screen
        </Text>
      </View>
    );
  }
}

export default ChatView;
