import React from 'react'
import {StackNavigator } from 'react-navigation'
import {headerDefinitions, homeNavigationOptions, appNavigationOptions} from './RoutsService'
import Home from '../../views/home/Home'
import InstitutesList from '../../views/institutes/InstitutesList'
import SelectDate from '../../views/institutes/SelectDate'
import EventOptions from '../../views/institutes/EventOptions'
import Activities from '../../views/activities/Activities'
import AdminActivities from '../../views/adminActivities/AdminActivitiyList'
import EventView from '../../views/adminActivities/EventView'
import CreateActivity from '../../views/adminActivities/CreateActivity'
import ContactsView from '../../views/contacts/ContactsView'
import AboutUsView from '../../views/aboutUs/AboutUsView'
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
                screen: InstitutesList,
                navigationOptions: headerDefinitions('רישום להתנדבות')
            },
            SelectDate:{
                screen: SelectDate,
                navigationOptions: headerDefinitions('בחר תאריך')
            },
            EventView:{
                screen: EventView,                
                navigationOptions: headerDefinitions('התנדבות')
            },
            EventOptions:{
                screen: EventOptions,
                navigationOptions: headerDefinitions('בחירת התנדבות')
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
            navigationOptions: headerDefinitions('ממשק רכזים')
        },
        EventView:{
            screen: EventView,                
            navigationOptions: headerDefinitions('התנדבות')
        },
        CreateActivity:{
            screen: CreateActivity,                
            navigationOptions: headerDefinitions('צור התנדבות')
        },
    },{navigationOptions: appNavigationOptions}
);

const ContactsRoute = StackNavigator(
    {
        Contacts:{
            screen: ContactsView,
            navigationOptions: headerDefinitions('אנשי קשר')
        },
    },{navigationOptions: appNavigationOptions}
);

const AboutUsRoute = StackNavigator(
    {
        AboutUs:{
            screen: AboutUsView,
            navigationOptions: headerDefinitions('אודות')
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

export default{
    HomeRoute,
    InstitutesRoute,
    ActivitiesRoute,
    ActivitiesAdminRoute,
    ContactsRoute,
    AboutUsRoute,    
    ProfileRoute,
    HelpRoute,
};



