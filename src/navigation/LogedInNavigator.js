import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Entypo } from '@expo/vector-icons';
import DashboardScreen from '../views/Dashboard';
//import SearchScreen from '../views/search/Search';
import ContactScreen from '../views/Contacts/Contacts';
import ChatScreen from '../views/chat/ChatView';
import ProfileScreen from '../views/profile/ProfileView';

import HospitalScreen from '../views/hospitalList/HospitalList';

const LoggedInNavigator = TabNavigator(
  {
    Contacts: { screen: ContactScreen,
      navigationOptions: {
        tabBarLabel: '',
        tabBarIcon: ({ tintColor }) => (
          <Entypo
            name="500px"
            size={32}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    Chat: { screen: ChatScreen },
    Dashbaord: { screen: DashboardScreen },
    Profile: { screen: ProfileScreen },
    Search: { screen: HospitalScreen },
    //Hospital: { screen: HospitalScreen },
  },
  {
    initialRouteName: 'Contacts',
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    showLabel: false,

  },
);

export default () => (
  <LoggedInNavigator onNavigationStateChange={null} />
);

