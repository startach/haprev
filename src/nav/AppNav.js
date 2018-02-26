import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { DrawerNavigator, StackNavigator, NavigationActions } from 'react-navigation';
import Home from "../views/home/Home";
import Institutes from "../views/institutes/Institute";
import Profile from "../views/profile/Profile";
import Activities from "../views/activities/Activities";
import AdminActivities from "../views/adminActivities/AdminActivities";
import AdminActivity from "../views/adminActivities/AdminActivity";
import Help from "../views/help/Help";

appNavigationOptions = ({ navigation }) => ({
    headerRight: <FontAwesome style={{paddingHorizontal:20}} name="chevron-left" size={24}
                              onPress={ () => {navigation.goBack() }} />,
    headerLeft: <FontAwesome style={{paddingHorizontal:20}} name="navicon" size={24}
                             onPress={ () => { navigation.navigate('DrawerOpen')}} />,
});

homeNavigationOptions = ({ navigation }) => ({
    headerLeft: <FontAwesome style={{paddingHorizontal:20}} name="navicon" size={24}
                             onPress={ () => { navigation.navigate('DrawerOpen')}} />,
});

function RenderStackNavigator(screens, isHome) {
    const Nav = {};
    for (let screen of screens){
        Nav[screen.screenName.name] = {
            screen: screen.screenName,
            headerMode: 'float',
            headerTransitionPreset: 'fade-in-place',
            navigationOptions: {title: screen.title}
        }
    }
    return StackNavigator(Nav, {navigationOptions: isHome ? homeNavigationOptions: appNavigationOptions});
}

export default DrawerNavigator({
    Home: RenderStackNavigator([{screenName: Home, title: 'מסך הבית'}], true),
    Institutes: RenderStackNavigator([{screenName: Institutes, title: 'בתי חולים'}]),
    Profile: RenderStackNavigator([{screenName: Profile, title: 'הפרופיל שלי'}]),
    Activities: RenderStackNavigator([{screenName: Activities, title: 'ההתנדבויות שלי'}]),
    ActivitiesAdmin: RenderStackNavigator([{screenName: AdminActivities, title: 'ניהול התנדבויות'},
        {screenName: AdminActivity, title: 'התנדבות'}]),
    Help: RenderStackNavigator([{screenName: Help, title: 'עזרה'}])
})
