import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import Messages from '../messages/Messages'
import HomeView from './HomeView'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
    container:{
        marginTop:50
    }
})

const Home = (props) =>
{
    return(
        <View style={styles.container}>
            <Messages/>
            <HomeView 
                first={props.first} 
                last={props.last}
                coordinator={props.coordinator}
            />
        </View>
    )
}

const mapStateToProps = state =>{
    return ({
               first:state.user.user.first,
               last:state.user.user.last,
               coordinator:state.user.user.coordinator
            })
    }

export default connect(mapStateToProps)(Home)
