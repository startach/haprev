import React, {Component} from "react";
import { Image, Button,StyleSheet, Dimensions ,TouchableHighlight, Linking } from "react-native";
import LoggedInNavigator from './TabNav';
import {DrawerNavigator,StackNavigator } from "react-navigation"; 
import Icon from "react-native-vector-icons/FontAwesome"; 
import ContactScreen from "../views/Contacts/Contacts";
import ProfileScreen from "../views/profile/ProfileView";
import HelpScreen from "../components/help/HelpView"; 


import { TabNavigator } from "react-navigation";
import DashboardScreen from "../views/Dashboard";

import ChatScreen from "../views/chat/ChatView";

//import HospitalScreen from "../views/hospitalList/HospitalList";
import HospitalScreen from'./HospitalSearch';

const { width } = Dimensions.get('screen'); 

const Drawer = DrawerNavigator ({
  HomeTabs:{
    screen: LoggedInNavigator, 
  },  
  Home:{
    screen: ContactScreen, 
    navigationOptions: { 
        drawerLabel: 'דף הבית',
        drawerIcon: ({ tintColor }) => <Icon name="home" size={24} />
      }, 
  },  
  Facebook_haprev: {
    screen: () => { Linking.canOpenURL('fb://page/arevolutionofhappiness')
    .then((supported) => {
      if (!supported) {
        Linking.openURL('http://facebook.com/arevolutionofhappiness/')
      } else {
        Linking.openURL('fb://page/arevolutionofhappiness')
      }})
    .catch(err => console.error('An error occurred', err))
   return null},
  navigationOptions: {
      drawerLabel: 'מהפכה של שמחה בפייסבוק',
      drawerIcon: ({ tintColor }) => <Icon name="facebook" size={24} />
    }, 
},
  Facebook_startach: {
    screen: () => { Linking.canOpenURL('fb://page/StartAchCom')
      .then((supported) => {
        if (!supported) {
          Linking.openURL('http://facebook.com/StartAchCom/')
        } else {
          Linking.openURL('fb://page/StartAchCom')
        }})
      .catch(err => console.error('An error occurred', err))
     return null},
    navigationOptions: {
        drawerLabel: 'סטארטאח בפייסבוק',
        drawerIcon: ({ tintColor }) => <Icon name="facebook" size={24} />
      }, 
  },
  Profile:{
    screen: ProfileScreen,
    navigationOptions: {
        drawerLabel: "פרופיל",
        drawerIcon: ({ tintColor }) => <Icon name="user" size={24} />,
      },
  },  
  Help:{
    screen: HelpScreen,
    navigationOptions: {
        drawerLabel: 'עזרה',
        drawerIcon: ({ tintColor }) => <Icon name="info" size={24} />
      },
      itemsContainerStyle: {
        backgroundColor: 'blue',
      },
      backgroundColor: 'pink'
  },   
  
}, 
{
  drawerWidth: width/1.6,
  contentOptions: {
    activeTintColor: '#e91e63',
    itemsContainerStyle: {
      marginVertical: 0,
    },
    iconContainerStyle: {
      opacity: 1
    },
    style: {
     // direction: 'rtl' //for ios
    },
  },
},
);

/*
const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
    backgroundColor: "transparent"
  }
});
const TabNav = TabNavigator(
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
  },
  {
    tabBarPosition: 'bottom',
  }
);


const Drawer = DrawerNavigator ({
  HomeTabs:{
    screen: LoggedInNavigator, 
  },  
  Home:{
    screen: ContactScreen, 
    navigationOptions: { 
        drawerLabel: '���',
        drawerIcon: ({ tintColor }) => <Icon name="home" size={24} />
      }, 
  },  
  Facebook_haprev: {
    screen: () => { Linking.openURL('https://www.facebook.com/StartAchCom/').catch(err => console.error('An error occurred', err)); return null },
    navigationOptions: {
        drawerLabel: '����� �� ����',
        drawerIcon: ({ tintColor }) => <Icon name="facebook" size={24} />
      }, 
  },
  Facebook_startach: {
    screen: () => { Linking.openURL('https://www.facebook.com/StartAchCom/').catch(err => console.error('An error occurred', err)); return null},
    navigationOptions: {
        drawerLabel: '�����-��',
        drawerIcon: ({ tintColor }) => <Icon name="facebook" size={24} />
      }, 
  },
  Profile:{
    screen: ProfileScreen,
    navigationOptions: {
        drawerLabel: "������",
        drawerIcon: ({ tintColor }) => <Icon name="user" size={24} />,
      },
  },  
  Help:{
    screen: HelpScreen,
    navigationOptions: {
        drawerLabel: '����',
        drawerIcon: ({ tintColor }) => <Icon name="info" size={24} />
      },
      itemsContainerStyle: {
        backgroundColor: 'blue',
      },
      backgroundColor: 'pink'
  },   
  
}, 
{
  drawerWidth: width/1.6,
  contentOptions: {
    activeTintColor: '#e91e63',
    itemsContainerStyle: {
      marginVertical: 0,
    },
    iconContainerStyle: {
      opacity: 1
    },
    style: {
     // direction: 'rtl' //for ios
    },
  },
},
);

 const StackNav= StackNavigator({
Home: { screen: TabNav },
Drawer: { screen: Drawer }
}, stackNavigatorConfig);
*/
class Root extends Component {
  render(){
    return(
      <Drawer>

      </Drawer>
    ) 
  }
}
export default Root;