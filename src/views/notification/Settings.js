import React from 'react'
import {View, Text, ScrollView, Switch, TouchableOpacity, StyleSheet, ToastAndroid} from 'react-native'
import { connect } from 'react-redux'
import { updateNotificationSettingUser } from '../../store/modules/user';
import {registerForPushNotificationsAsync} from '../notification/NotificationService'

class Settings extends React.Component{
    state = {
        notificationStatus: null,
        NewNotificationStatus: null,
        spinner:false,
        notificationVisible:true
    }

    componentWillMount(){
        currStatus = false
        if(this.props.user.settings)
            currStatus = this.props.user.settings.status == 'granted'
        this.setState({
            notificationStatus: currStatus, 
            NewNotificationStatus: currStatus
        })
    }

    acceptSettings = async() => {
        if(this.state.notificationStatus != this.state.NewNotificationStatus){
            newSettings = {}
            if(!this.state.notificationStatus && this.state.NewNotificationStatus) // ask for permission
                newSettings = await registerForPushNotificationsAsync()
            else{  //turn off the notifications 
                newSettings['token'] = ''
                newSettings['status'] = 'no'
            }
            res = await this.props.updateNotificationSettingUser(newSettings)
            ToastAndroid.show('ההגדרות נשמרו בהצלחה', ToastAndroid.SHORT)
            this.props.navigation.navigate('Home')
        }
        else
            ToastAndroid.show('אין שינוי בהגדרות', ToastAndroid.SHORT)
    }

    render() {
        return(
            <ScrollView>
                <View style = {{backgroundColor: '#EAE6DA'}}>
                    <View style={styles.modalContainer}>
                        <View style={styles.notificationBox} >
                            <Text style={styles.title}>קבלת התראות</Text>
                            <Switch 
                            onTintColor={'#00A591'}
                            thumbTintColor={ this.state.NewNotificationStatus ? '#79C753' : '#898E8C'}
                            tintColor={'#B93A32'}
                            style= {styles.switch}
                            onValueChange={() => this.setState({NewNotificationStatus:!this.state.NewNotificationStatus})}
                            value={this.state.NewNotificationStatus}
                            />
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity
                                rounded
                                title={'אישור'} 
                                style={[styles.button,{marginTop:5,marginBottom:5}]}
                                onPress={this.acceptSettings}
                                >
                                    {
                                    !this.state.spinner ?
                                    <Text style={styles.buttonText}>שמור</Text>
                                    :
                                    <ActivityIndicator size='large' color='#fff' /> 
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return ({
            user:state.user.user
        })
}

const styles = StyleSheet.create({
    switch:{
        marginRight:10,
        alignSelf:'center',
        paddingRight:2
    },
    title:{
        fontSize:18,
        textAlign:'left',
        color:'#e24183',
        marginTop:10,
        paddingRight:20,
        fontWeight:'500'
    },
    button: {
        marginRight:15,
        marginTop: 10,
        padding: 5,
        backgroundColor: "#D81A4C",
        borderRadius: 5,
        alignSelf: "center"
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center"
    },
    modalContainer: {
        marginVertical: 15,
        padding: 2,
        justifyContent: 'center',
        alignSelf:'center',        
        backgroundColor: '#F0EDE5',
        width: '85%',
        borderWidth:1,
    },
    notificationBox:{
        flexDirection: "row", 
        justifyContent: 'space-between'
    },
});

export default connect(mapStateToProps,{updateNotificationSettingUser})(Settings)