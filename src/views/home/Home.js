import React from 'react'
import {View,Text,StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        marginTop:50
    }
})

const Home = (props) =>
{
    return(
        <View style={styles.container}>
            <Text> this will be Home screen </Text>
        </View>
    )
}

export default Home