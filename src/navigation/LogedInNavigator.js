import React, {Component} from "react";
import { Dimensions} from "react-native";
import {DrawerNavigator} from "react-navigation";
import SideMenu from "./SideMenu";
import ContactsScreen from "../views/Contacts/Contacts";
import HelpScreen from "../views/help/HelpView"; 
import MyAccountScreen from '../views/MyAccount/MyAccountView';
import ProfileScreen from "../views/profile/ProfileView";
import DashboardScreen from "../views/Dashboard";
import ChatScreen from "../views/chat/ChatView";
import HospitalScreen from'./HospitalSearch';

const { width } = Dimensions.get('screen'); 

class Root extends Component { 
  render(){ 
    const Drawer = DrawerNavigator({  
    Home:{
      screen: DashboardScreen, 
    },  
    Search:{
      screen: HospitalScreen,
    },  
    Chat:{
      screen: ChatScreen,
    },   
    MyAccount:{
      screen: MyAccountScreen,
    },  
    Profile:{
      screen: ProfileScreen,
    },   
    Contacts:{
      screen: ContactsScreen,
    },  
    Help:{
      screen: HelpScreen,
    },   
    
  }, 
  { 
    initialRouteName: 'Contacts',
    contentComponent: (props)=> <SideMenu {...props}/>,
    drawerWidth: width/1.6,
    headerMode: 'float',
    drawerPosition: 'left',
    contentOptions: {
      activeTintColor: '#e91e63',
      itemsContainerStyle: {
        marginVertical: 0,
      },
      iconContainerStyle: {
        opacity: 1
      },
    },
  }
  );
  
  return(
      <Drawer/>
    ) 
  } 
} 

export default Root; 