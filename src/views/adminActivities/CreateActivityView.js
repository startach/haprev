import React from 'react'
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableHighlight,
    KeyboardAvoidingView,
    TouchableOpacity,
    StyleSheet,
    Modal} from "react-native";
import {
    Calendar,
    CalendarList,
    Agenda } from 'react-native-calendars';


const CreateActivityView = (props) =>(
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <TextInput
                style={styles.name}
                placeholder='שם פעילות'>
            </TextInput>

            <Calendar
                onDayPress={this.onDayPress}
                hideExtraDays
                hideArrows
                markingType={'period'}>
            </Calendar>
        </KeyboardAvoidingView>
)

export default CreateActivityView;


const styles = StyleSheet.create ({
    container:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        borderWidth:2,
        borderColor:'yellow'
    },
    name: {
        height:100
    }
})