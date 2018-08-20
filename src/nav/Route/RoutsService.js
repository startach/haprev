import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import styles from './RoutsStyle'

export const headerDefinitions = (title) =>(
    {
    headerMode: 'float', 
    headerTransitionPreset: 'fade-in-place'
    },
    {
    title: title,                
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.headerTitleStyle,
    }
);

export const appNavigationOptions = ({ navigation }) => ({
    headerRight: <FontAwesome style={styles.icon} name='chevron-left' size={24}
                    onPress={ () => { navigation.goBack() ? navigation.goBack() : navigation.navigate('HomeRoute') }}/>,
    headerLeft: <FontAwesome style={styles.icon} name='navicon' size={24}
                    onPress={ () => { navigation.navigate('DrawerOpen')}} />
});

export const homeNavigationOptions = ({ navigation }) => ({
    headerRight: <FontAwesome style={[styles.icon,{color:'#F5F5F1'}]} name={navigation.state.routeName==='Home'? 'cogs' : 'home'} size={30}
                    onPress={ () => {navigation.state.routeName==='Home' ? navigation.navigate('Settings') : navigation.navigate('Home') }}/>,
    headerLeft: <FontAwesome style={styles.icon} name='navicon' size={24}
                    onPress={ () => { navigation.navigate('DrawerOpen')}} />,
});