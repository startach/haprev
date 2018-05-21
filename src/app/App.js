import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Expo from 'expo';
import getStore from '../store/createStore';
import Splash from '../views/splash/Splash'
import initdb from './initDb';

const store = getStore;

class App extends Component {
  constructor() {
    super();
    this.state = {
      fontsAreLoaded: false,
    };
  }

  async componentWillMount() {
      /*
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    */
    initdb();
    this.setState({ fontsAreLoaded: true });
  }

  render() {
    if (this.state.fontsAreLoaded) {
      return (
        <Provider store={store} >
          <Splash />
        </Provider>);
    }
    return (<Expo.AppLoading />);
  }
}

export default App;
