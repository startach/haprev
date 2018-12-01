import React from 'react';
import { View, Image, Animated, StyleSheet } from 'react-native';
const splashImg = require('../../images/splash-min.jpg');
const splashImgWhite = require('../../images/splashWhite-min.jpg');
import InternetConnectionPopUp from './InternetConnectionPopUp'

export default class SplashScreen extends React.Component {
  state = {
    opacity: new Animated.Value(0),
  }

  onLoad = () => {
    Animated.timing(this.state.opacity,{
      toValue: 1,
      delay: 500,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }

  render() {
    return (
      <View
        style={styles.container}
      >
        <Animated.Image
        onLoad={this.onLoad}
          style={[styles.splash,{opacity: this.state.opacity, zIndex: 99}]}
          source={splashImg}
        />
        <Image
        style={styles.splash}
        source={splashImgWhite}
        />
        <InternetConnectionPopUp/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  splash:{
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  }
});