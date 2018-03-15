import React from 'react';
import Nav from './src/app/App'
import { I18nManager } from 'react-native';
export default class App extends React.Component {
  constructor(props) {
    super(props);
  //  I18nManager.forceRTL(true); 
   const ReactNative = require('react-native');
    try{
      ReactNative.I18nManager.allowRTL(true);
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
