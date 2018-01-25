import React from 'react'
import {View,Text,StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        marginTop:50
    }
})

const Register = (props) =>
{
    console.log('kuku', props.user)
    return(
        <View style={styles.container}>
            <Text> this will be Register screen </Text>
        </View>
    )
}

export default Register