import React from 'react'
import {View,Text, StyleSheet} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import styles from './RoutsStyle'
import { LinearGradient } from 'expo';


const GradientHeader = () => (
    <LinearGradient
            colors={['#c92656','#D81A4C', '#b71540', '#891030']}
            style={{ flex: 1 }}
            start={[0, 0.1]}
            end={[1, 0.5]}
        />
    )

export const headerDefinitions = (title) =>(
    {
    headerMode: 'float', 
    headerTransitionPreset: 'fade-in-place'
    },
    {
    headerBackground: GradientHeader(),
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
    headerRight:
        <View style={{flexDirection:'row',margin:-10}}>
            {navigation.state.routeName==='Home' && 
            <FontAwesome style={[styles.icon,{color:'#ffffcc'}]} name={'envelope'} size={28}
                onPress={ () => {navigation.navigate('Messages')}}/>
            }
            <FontAwesome style={[styles.icon,{color:'#F5F5F1'}]} name={navigation.state.routeName==='Home'? 'cogs' : 'home'} size={30}
                onPress={ () => {navigation.state.routeName==='Home' ? navigation.navigate('Settings') : navigation.navigate('Home') }}/>
        </View>,
    headerLeft: <FontAwesome style={styles.icon} name='navicon' size={24}
                    onPress={ () => { navigation.navigate('DrawerOpen')}} />,
});