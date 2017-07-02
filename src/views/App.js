import React from 'react';
import { View } from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  connectStyle,
  Grid,
  Col
} from 'native-base';
import Expo from 'expo';
import PropTypes from 'prop-types';

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
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>הרשמו והפכו לחלק ממהפכה של שמחה!</Text>
          <View style={styles.buttonsContainer}>
            <Button rounded style={styles.button}>
              <Text>התחברו באמצעות F</Text>
            </Button>
          </View>
          <View style={styles.buttonsContainer}>
            <Button rounded style={styles.button}>
              <Text>צרו חשבון חדש</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'    
  },
  contentContainer: {
    flex: 1,
    justifyContent:'center',
    padding: 20
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 28,
    fontFamily: 'Roboto_medium',
    textAlign: 'center'
  },
  button: {
    justifyContent: 'center',
    marginTop: 20,
    width: '100%'    
  },
  buttonsContainer: {
    justifyContent: 'center'
    
  }
};

App.propTypes = {
  style: PropTypes.object.isRequired
};
// connect the component to the theme
export default connectStyle('yourTheme.CustomComponent', styles)(App);
