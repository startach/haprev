import React from 'react';
import Nav from './src/app/App'
import {I18nManager} from 'react-native'

export default class App extends React.Component {
  componentWillMount() {
    try{
      I18nManager.forceRTL(true); //Not sure, i'll try it with more devices 
      I18nManager.swapLeftAndRightInRTL(true)
      I18nManager.doLeftAndRightSwapInRTL=true;
    } catch(e){
      console.warn(e);
    }
  }
  render() {
    return (
      <Nav/>
    )
  }
}
