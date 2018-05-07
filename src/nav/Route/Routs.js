import React from 'react'
import {StackNavigator } from 'react-navigation'
import { FontAwesome } from '@expo/vector-icons'
import {headerDefinitions, homeNavigationOptions, appNavigationOptions} from './RoutsService'
import Home from '../../views/home/Home'
import Institutes from '../../views/institutes/InstitutesList'
import SelectDate from '../../views/institutes/SelectDate'
import Activities from '../../views/activities/Activities'
import AdminActivities from '../../views/adminActivities/AdminActivitiyList'
import AdminActivity from '../../views/adminActivities/AdminActivity'
import CreateActivity from '../../views/adminActivities/CreateActivityView'
import Profile from '../../views/profile/Profile'
import Help from '../../views/help/Help'

const HomeRoute = StackNavigator(
    {
        Home:{
        screen: Home,
        navigationOptions: headerDefinitions('מסך הבית')
        },
    },{navigationOptions: homeNavigationOptions}
);

const InstitutesRoute = StackNavigator(
        {
            Institutes:{
                screen: Institutes,
                navigationOptions: headerDefinitions('בתי חולים')
            },
            SelectDate:{
                screen: SelectDate,                
                navigationOptions: headerDefinitions('בחר תאריך')
            }
        },{navigationOptions: appNavigationOptions}
);

const ActivitiesRoute = StackNavigator(
    {
        Activities:{
            screen: Activities,
            navigationOptions: headerDefinitions('ההתנדבויות שלי')
        },
    },{navigationOptions: appNavigationOptions}
);

const ActivitiesAdminRoute = StackNavigator(
    {
        AdminActivities:{
            screen: AdminActivities,
            navigationOptions: headerDefinitions('ניהול התנדבויות')
        },
        AdminActivity:{
            screen: AdminActivity,                
            navigationOptions: headerDefinitions('התנדבות')
        },
        CreateActivity:{
            screen: CreateActivity,                
            navigationOptions: headerDefinitions('צור התנדבות')
        },
    },{navigationOptions: appNavigationOptions}
);

const ProfileRoute = StackNavigator(
    {
        Profile:{
            screen: Profile,
            navigationOptions: headerDefinitions('פרופיל')
        },
    },{navigationOptions: appNavigationOptions}
);

const HelpRoute = StackNavigator(
    {
        Help:{
            screen: Help,
            navigationOptions: headerDefinitions('עזרה')
        },
    },{navigationOptions: appNavigationOptions}
);

export {
    HomeRoute,
    InstitutesRoute,
    ActivitiesRoute,
    ActivitiesAdminRoute,
    ProfileRoute,
    HelpRoute,
};



