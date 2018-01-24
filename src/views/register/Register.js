import React from 'react'
import {View,Text,StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        marginTop:50
    }
})

const Register = (props) =>
{
    return(
        <View style={styles.container}>
            <Text> this will be Register screen </Text>
        </View>
    )
}

export default Register