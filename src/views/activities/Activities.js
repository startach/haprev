import React from 'react'
import {View,Text,StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        marginTop:50
    }
})

const Activities = (props) =>
{
    return(
        <View style={styles.container}>
            <Text> this will be Activities screen </Text>
        </View>
    )
}

export default Activities