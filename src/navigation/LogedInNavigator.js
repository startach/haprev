import React, {Component} from "react";
import {Text, Image, StyleSheet, Dimensions , Linking } from "react-native";
import TabNav from './TabNav';
import {DrawerNavigator,StackNavigator,stackNavigatorConfig } from "react-navigation"; 
import Icon from "react-native-vector-icons/FontAwesome"; 
import ContactScreen from "../views/Contacts/Contacts";
import HelpScreen from "../views/help/HelpView"; 
import MyAccountScreen from '../views/MyAccount/MyAccountView';

import DashboardScreen from "../views/Dashboard";
import ChatScreen from "../views/chat/ChatView";
import HospitalScreen from'./HospitalSearch';

const { width } = Dimensions.get('screen'); 

class Root extends Component { 
  render(){ 
   const { navigation } = this.props.navigation;
   const _exit="";
   const Drawer = DrawerNavigator({  
    Close:{
         screen: 
           TabNav,        
       //  () => {navigation.goBack()}, 
       //  () => { this.props.navigation.navigate('DrawerClose') } ,  
         navigationOptions: ({navigation}) => ({ 
           drawerLabel: <Text onPress={() => navigation.navigate('DrawerClose')}>{_exit}</Text>,
           drawerIcon: ({ tintColor }) => <Icon name="close" size={24} />
         }),
       }, 
    Home:{
      screen: TabNav, 
      navigationOptions: { 
          drawerLabel: 'בית',
        }, 
    },  
    Facebook_haprev: {
      screen: () => { Linking.canOpenURL('fb://page/947461178709459')
      .then((supported) => {
        if (!supported) {
          Linking.openURL('http://facebook.com/arevolutionofhappiness/')
        } else {
          Linking.openURL('fb://page/947461178709459')
        }})
      .catch(err => Alert.alert(err))
      return null
      },
    navigationOptions: {
        drawerLabel: 'מהפכה של שמחה',
      }, 
  },
    Facebook_startach: {
      screen: () => { Linking.canOpenURL('fb://page/1216464335058002')
        .then((supported) => {
          if (!supported) { 
            Linking.openURL('http://facebook.com/StartAchCom/')
          } else {
            Linking.openURL('fb://page/1216464335058002')
          }})
        .catch(err => console.error('An error occurred', err))
       return null},
      navigationOptions: {
          drawerLabel: 'סטארט-אח',
        }, 
    },
    MyAccount:{
      screen: MyAccountScreen,
      navigationOptions: {
          drawerLabel: "איזור אישי",
        },
    },  
    Help:{
      screen: HelpScreen,
      navigationOptions: {
          drawerLabel: 'עזרה',
        },
    },   
    
  }, 
  { 
    initialRouteName: 'Home',
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
      style: {
       // direction: 'rtl' //for ios
      },
    },
  }
  );
  
  const StackNav= StackNavigator({
    Drawer: { screen: Drawer },
   // Home: { screen: TabNav },
  },stackNavigatorConfig);

  return(
      <Drawer/>
    ) 
  } 
} 

export default Root; 