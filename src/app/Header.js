import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity  } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome"; //Hamburger icon
class Header extends Component {
  render() {
    const { caption, userAvatar, navigation } = this.props;
    const back = '<';
    return (
      <View style={styles.header}>
      <TouchableOpacity  onPress={() => navigation.navigate('DrawerOpen')}>
        <Icon style={styles.back} name="bars" size={32} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.goBack(null); }}>
        <Text style={styles.back}>{back}</Text>
      </TouchableOpacity>
        <Text style={styles.headerText}>{caption}</Text>
        <Image
          style={styles.avatar}
          source={{ uri: userAvatar }}
          resizeMode="stretch"
        />
      </View>
    );
  }
}

export default Header;



const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#D81A4C',
    height: 60,
  },
  back: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 64,
  },
});
