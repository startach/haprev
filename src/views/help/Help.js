import React from 'react'
import {View,Text,StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        marginTop:50
    }
})

const Help = (props) =>
{
    return(
        <View style={styles.container}>
            <Text> this will be Help screen </Text>
        </View>
    )
}

export default Help