import React from 'react'
import {Dimensions, I18nManager} from 'react-native'
import {DrawerNavigator} from 'react-navigation'
import SideMenu from './SideMenu'
import {
    HomeRoute,
    InstitutesRoute,
    ActivitiesRoute,
    ActivitiesAdminRoute,
    ProfileRoute,
    HelpRoute,
} from './Route/Routs'

const { width } = Dimensions.get('screen');

export default DrawerNavigator({
    Home: HomeRoute,
    Institutes:  InstitutesRoute,
    Activities: ActivitiesRoute,
    ActivitiesAdmin: ActivitiesAdminRoute,
//  Contacts: ContactsRoute
//  AboutUs: AboutUsRoute
    Profile: ProfileRoute,
    Help: HelpRoute,
},{
    contentComponent: (props)=> <SideMenu activeItemKey={props.activeItemKey} {...props}/>,
    drawerPosition: I18nManager.isRTL && !I18nManager.localeIdentifier.includes('IL') ? 'right': 'left',
    drawerWidth: width*0.70,
})

