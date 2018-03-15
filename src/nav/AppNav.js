import React from 'react'
import {StyleSheet,Dimensions} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { DrawerNavigator, StackNavigator, NavigationActions } from 'react-navigation';
import SideMenu from './SideMenu';
import Home from "../views/home/Home";
import Institutes from "../views/institutes/Institute";
import Profile from "../views/profile/Profile";
import Activities from "../views/activities/Activities";
import AdminActivities from "../views/adminActivities/AdminActivities";
import AdminActivity from "../views/adminActivities/AdminActivity";
import Help from "../views/help/Help";

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    headerStyle: { 
        backgroundColor: '#D81A4C',
        borderWidth: 2 ,
        borderColor:'#c92656' 
    },
    headerTitleStyle: {
        color: 'white',
        fontSize: 24 ,
        textAlign: 'center',
        alignSelf:'center',
    },
    icon:{
        paddingHorizontal:20,
        color: 'white'
    },
  });

appNavigationOptions = ({ navigation }) => ({
    headerRight: <FontAwesome style={styles.icon} name="chevron-left" size={24}
                              onPress={ () => { navigation.goBack() ? navigation.goBack() : navigation.navigate('Home') }}/>,
    headerLeft: <FontAwesome style={styles.icon} name="navicon" size={24}
                             onPress={ () => { navigation.navigate('DrawerOpen')}} />,
});

homeNavigationOptions = ({ navigation }) => ({
    headerLeft: <FontAwesome style={styles.icon} name="navicon" size={24}
                             onPress={ () => { navigation.navigate('DrawerOpen')}} />,         
});

function RenderStackNavigator(screens, isHome) {
    const Nav = {};
    for (let screen of screens){
        Nav[screen.screenName.name] = {
            screen: screen.screenName,
            headerMode: 'float',
            headerTransitionPreset: 'fade-in-place',
            navigationOptions: {
                title: screen.title, 
                headerStyle: styles.headerStyle,
                headerTitleStyle: styles.headerTitleStyle,
            }
        }
    }
    return StackNavigator(Nav, {navigationOptions: isHome ? homeNavigationOptions: appNavigationOptions});
}

export default DrawerNavigator({
    Home: RenderStackNavigator([{screenName: Home, title: 'מסך הבית'}], true),
    Institutes: RenderStackNavigator([{screenName: Institutes, title: 'בתי חולים'}]),
    Activities: RenderStackNavigator([{screenName: Activities, title: 'ההתנדבויות שלי'}]),
    ActivitiesAdmin: RenderStackNavigator([{screenName: AdminActivities, title: 'ניהול התנדבויות'},
        {screenName: AdminActivity, title: 'התנדבות'}]),
  //  Contacts: RenderStackNavigator([{Contacts: Contacts, title: 'אנשי קשר'}]),
  //  AboutUs: RenderStackNavigator([{screenName: AboutUs, title: 'אודות'}]), 
    Profile: RenderStackNavigator([{screenName: Profile, title: 'הפרופיל שלי'}]),
    Help: RenderStackNavigator([{screenName: Help, title: 'עזרה'}])
},{
    contentComponent: (props)=> <SideMenu {...props}/>,
    drawerPosition: 'left',
    drawerWidth: width*0.70,
})

