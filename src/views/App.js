import React from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  connectStyle,
  Icon
} from 'native-base';
import Expo from 'expo';
import PropTypes from 'prop-types';

const bg = require('../images/bg.jpg');
const logo = require('../images/logo.png');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf')
    });

    this.setState({ isReady: true });
  }
  render() {
    const styles = this.props.style;
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Image source={bg} style={styles.backgroundImage}>
          <View style={styles.loginExistButtonView}>
            <Button rounded bordered style={styles.loginExistButton}>
              <Text style={styles.loginExistButtonText}>חשבון קיים</Text>
            </Button>
          </View>
        <Container style={styles.container}>
          <Content contentContainerStyle={styles.contentContainer}>
            <View style={styles.contentView}>
              <Image source={logo} style={styles.logoImage} />
              <View style={styles.titlesContainer}>
                <Text style={styles.title}>הרשמו והפכו לחלק</Text>
                <Text style={styles.subtitle}>ממהפכה של שמחה!</Text>
              </View>
              <View style={styles.buttonsContainer}>
                <Button rounded style={styles.button}>                  
                  <Text>התחברו באמצעות </Text>
                  <Icon name="logo-facebook" />
                </Button>
              </View>
              <View style={styles.buttonsContainer}>
                <Button rounded style={styles.registerButton}>
                  <Text>צרו חשבון חדש</Text>
                </Button>
              </View>
              <View style={styles.orTextContainer}>
                <Text style={styles.orText}>או</Text>
              </View>
              <View style={styles.buttonsContainer}>
                <Button rounded bordered style={styles.guestButton}>
                  <Text style={styles.guestButtonText}>התחברו כאורחים</Text>
                </Button>
              </View>
            </View>
          </Content>
        </Container>
      </Image>
    );
  }
}

const styles = {
  backgroundImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  logoImage: {
    alignSelf: 'center',
    width: 150,
    resizeMode: 'contain',
    padding: 20,
    margin: 0
  },
  contentView: {
    flex: 0,
    padding: 0,
    margin: 0
  },
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 0
  },
  loginExistView: {
    flex: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end'
  },
  loginExist: {
    fontSize: 15,
    textAlign: 'right',
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 0,
    textDecorationLine: 'underline',
    color: '#FFF'
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 28,
    fontFamily: 'Roboto_medium',
    textAlign: 'center',
    color: '#FFF'
  },
  titlesContainer: {
    padding: 20
  },
  subtitle: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 28,
    fontFamily: 'Roboto_medium',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFF'
  },
  button: {
    justifyContent: 'center',
    marginTop: 20,
    width: '100%'
  },
  registerButton: {
    backgroundColor: 'rgb(211,75,53)',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%'
  },
  guestButton: {
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
    borderColor: '#FFF'
  },
  guestButtonText: {
    color: '#FFF'
  },
  buttonsContainer: {
    justifyContent: 'center'
  },
  orTextContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10
  },
  orText: {
    textAlign: 'center',
    color: '#FFF'
  },
  loginExistButtonView: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    marginTop: 10,
    borderColor: '#FFF'
  },
  loginExistButton: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    marginTop: 20,
    height: 30,
    borderColor: '#FFF'
  },
  loginExistButtonText: {
    color: '#FFF',
    paddingLeft: 0,
    paddingRight: 0,
  }
};

App.propTypes = {
  style: PropTypes.object.isRequired
};
// connect the component to the theme
export default connectStyle('yourTheme.CustomComponent', styles)(App);
