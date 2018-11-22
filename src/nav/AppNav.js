import React from 'react'
import {Dimensions, I18nManager, Platform} from 'react-native'
import {DrawerNavigator} from 'react-navigation'
import SideMenu from './SideMenu'
import routes from './Route/Routs';
import { connect } from 'react-redux'

const { width } = Dimensions.get('screen');

const Drawer = DrawerNavigator(
    routes,{
        contentComponent: (props)=> <SideMenu coordinator={this._coordinator} {...props} />,
        drawerPosition: Platform.OS === 'android' && I18nManager.isRTL && !I18nManager.localeIdentifier.includes('IL') ? 'right': 'left',
        drawerWidth: width*0.666,
    }) 

const mapStateToProps = state =>{
    this._coordinator =  state.user.user.coordinator
    return ({
            coordinator: state.user.user.coordinator
            })
    }

export default connect(mapStateToProps)(Drawer)