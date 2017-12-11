import React, {Component} from "react";
import { Image,StyleSheet } from "react-native";
import { TabNavigator } from "react-navigation";
import DashboardScreen from "../views/Dashboard";
import ContactScreen from "../views/Contacts/Contacts";
import ChatScreen from "../views/chat/ChatView";
import ProfileScreen from "../views/profile/ProfileView";
//import HospitalScreen from "../views/hospitalList/HospitalList";
import HospitalScreen from'./HospitalSearch';


const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
    backgroundColor: "transparent"
  }
});

const LoggedInNavigator = TabNavigator(
  {
    Contacts: {
      screen: ContactScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../images/phone_icon.png")}
            style={[styles.icon, { tintColor }]}
          />
        )
      }
    },
    Chat: {
      screen: ChatScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../images/chat_icon.png")}
            style={[styles.icon, { tintColor }]}
          />
        )
      }
    },
    Dashbaord: {
      screen: DashboardScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../images/home_icon.png")}
            style={[styles.icon, { tintColor }]}
          />
        )
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../images/social_icon.png")}
            style={[styles.icon, { tintColor }]}
          />
        )
      }
    },
    Search: {
      screen: HospitalScreen,
      navigationOptions: {
        header:null,
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../images/search_icon.png")}
            style={[styles.icon, { tintColor }]}
          />
        )
      }
    }
  }, 
  {
    initialRouteName: "Contacts", 
    tabBarPosition: "bottom",
    swipeEnabled: false,
    showLabel: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: "white"
      },
      activeTintColor: 'white',
      inactiveTintColor: 'black',
      indicatorStyle: {
        backgroundColor: 'red',
        borderRadius: 43/2,
        height: 43,
        position: 'relative',
        top: 3
      },
    }
  }
);

export default LoggedInNavigator;
//export default () => <LoggedInNavigator onNavigationStateChange={null} />