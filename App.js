import React from 'react';
import Nav from './src/app/App'
import {I18nManager, Platform} from 'react-native'
import clone from 'lodash/clone';

export default class App extends React.Component {

  async componentWillMount() {
    try{
      //I18nManager.swapLeftAndRightInRTL(true)
      if(Platform.OS === 'android')
        await I18nManager.forceRTL(true)
    } 
    catch(e){console.warn('RTL Error', e)}
    console.ignoredYellowBox = ['Setting a timer'];
    const _console = clone(console);
    console.warn = message => {
      if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
      }
    };
  }

  render() {
    return <Nav/>
  }
}
