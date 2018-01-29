import React from 'react'
import {View,Text,StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        marginTop:50
    }
})

const Institutes = (props) =>
{
    return(
        <View style={styles.container}>
            <Text> this will be Institutes screen </Text>
        </View>
    )
}

export default Institutes