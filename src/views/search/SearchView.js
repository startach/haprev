import React from 'react';
import Header from '../../app/Header';
import { StyleSheet, Text, View } from 'react-native';

export default class SearchView extends React.Component {
  render() {
    const { navigation, avatar, hospitals } = this.props;
    return (
      <View style={styles.container}>
        <Header
          caption="contacts"
          userAvatar={avatar}
          navigation={navigation}
        />
        <Text>This will be search screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
