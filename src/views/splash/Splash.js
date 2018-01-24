import React from 'react'
import {View,Text,StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        marginTop:50
    }
})

const Splash = (props) =>
{
    return(
        <View style={styles.container}>
            <Text> this will be splash screen </Text>
        </View>
    )
}

export default Splash