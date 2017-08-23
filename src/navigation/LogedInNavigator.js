import React from 'react';
import {
  AppRegistry,
  Text,
  Image,
  View,
  StyleSheet
} from 'react-native';

import { TabNavigator } from 'react-navigation';
import DashboardScreen from '../views/Dashboard';
//import SearchScreen from '../views/search/Search';
import ContactScreen from '../views/Contacts/Contacts';
import ChatScreen from '../views/chat/ChatView';
import ProfileScreen from '../views/profile/ProfileView';

import HospitalScreen from '../views/hospitalList/HospitalList';

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
    backgroundColor: 'transparent',
  },
});

const LoggedInNavigator = TabNavigator(
  {
    Contacts: { screen: ContactScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../images/phone_icon.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
      },
    },
    Chat: { screen: ChatScreen, 
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../images/chat_icon.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
      },
    },
    Dashbaord: { screen: DashboardScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../images/home_icon.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
      },
    },
    Profile: { screen: ProfileScreen, 
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../images/social_icon.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
      },
    },
    Search: { screen: HospitalScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../images/search_icon.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
      },},
    //Hospital: { screen: HospitalScreen },
  },
  {
    initialRouteName: 'Contacts',
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    showLabel: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: 'transparent',
      },
      activeTintColor: 'red',
      inactiveTintColor: 'black',
    }

  },
);

export default () => (
  <LoggedInNavigator onNavigationStateChange={null} />
);

