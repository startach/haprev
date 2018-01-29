import React from 'react';
import { View, Image } from 'react-native';

const splashImg = require('../../images/splash.jpg');

export default class SplashScreen extends React.Component {
  componentWillMount() {
    const { navigate } = this.props;
    setTimeout(() => {
      navigate('AppNav');
    }, 2000);
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Image
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%'
          }}
          source={splashImg}
        />
      </View>
    );
  }
}
