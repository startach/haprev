import React from 'react';
import Nav from './src/app/App'
import {I18nManager} from 'react-native'
import _ from 'lodash';

export default class App extends React.Component {
  componentWillMount() {
    console.ignoredYellowBox = ['Setting a timer'];
    const _console = _.clone(console);
    console.warn = message => {
      if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
      }
    };
    try{
      I18nManager.forceRTL(true); //Not sure, i'll try it with more devices 
      I18nManager.swapLeftAndRightInRTL(true)
      I18nManager.doLeftAndRightSwapInRTL=true;
    } catch(e){
      console.warn('RTL Error',e);
    }
  }
  render() {
    return (
      <Nav/>
    )
  }
}
