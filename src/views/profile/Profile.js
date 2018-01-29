import React from 'react'
import {View,Text,StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        marginTop:50
    }
})

const Profile = (props) =>
{
    return(
        <View style={styles.container}>
            <Text> this will be Profile screen </Text>
        </View>
    )
}

export default Profile