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
    headerLeft: <FontAwesome style={styles.icon} name='navicon' size={24}
                    onPress={ () => { navigation.navigate('DrawerOpen')}} />,         
});