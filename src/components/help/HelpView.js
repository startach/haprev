import React, { Component } from 'react';
import { View, Text,StyleSheet, Button } from 'react-native';
import Header from '../../app/Header';

class HelpView extends Component {
  render() {
    const { navigation, avatar } = this.props;
    return (
      <View style={styles.container}>
        <Header
          caption="עזרה"
          userAvatar={avatar}
          navigation={navigation}
        />
        <Text style={styles.textStyle}>This will be Help screen..</Text>
        <Button onPress={() => this.props.navigation.navigate('DrawerOpen')} title="open"/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textStyle: {
    fontSize: 24,
    alignItems: 'center',
    justifyContent: 'center',
  }
});


export default HelpView;
