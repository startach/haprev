import React from 'react';
import Nav from './src/app/App'
import {I18nManager} from 'react-native'
import _ from 'lodash';

export default class App extends React.Component {

  async componentWillMount() {
    try{
      //I18nManager.swapLeftAndRightInRTL(true)
      await I18nManager.forceRTL(true)
    } catch(e){
      console.warn('RTL Error',e);
    }
    console.ignoredYellowBox = ['Setting a timer'];
    const _console = _.clone(console);
    console.warn = message => {
      if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
      }
    };
  }
  render() {
    return (
      <Nav/>
    )
  }
}
