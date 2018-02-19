import React from 'react'
import {View,Text,StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        marginTop:50
    }
})

const ActivitiesAdmin = (props) =>
{
    const { navigate } = props.navigation;
    return(
        <View style={styles.container}>
            <Text> this will be ActivitiesAdmin screen </Text>
            <Text onPress={() => {
                navigate('Activities');
            }}> Click fot next </Text>
        </View>
    )
}

export default ActivitiesAdmin