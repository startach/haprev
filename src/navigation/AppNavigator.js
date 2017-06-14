import React from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from '../views/App'
import DashboardScreen from '../views/Dashboard'
import SearchScreen from '../views/search'


export default HapRev = StackNavigator({
  Home: { screen: HomeScreen },
  Dashbaord: {screen:DashboardScreen},
  Search: {screen:SearchScreen}
});
