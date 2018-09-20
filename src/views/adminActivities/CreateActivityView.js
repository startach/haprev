import React, { Component } from 'react';
import {View, Text, TextInput, KeyboardAvoidingView, Keyboard, TouchableOpacity, Modal, TouchableWithoutFeedback, Switch, ActivityIndicator} from "react-native";
import DateTimePicker from 'react-native-modal-datetime-picker';
import {CreateActivityStyle as styles } from './styles';
import {sendNotificationToAllUsers} from '../notification/NotificationService';

class CreateActivityView extends Component {
    constructor(props) {
        super(props);
        this.currentDate = new Date();
        this.extraYear = new Date(this.currentDate.getUTCFullYear() + 1, this.currentDate.getUTCMonth(), this.currentDate.getUTCDate());
        this.alertDate = '';
        this.state = { 
            activityName: '',
            fullDate:'',
            fullTime:'',
            fullFormatDate:'',
            isDateTimePickerVisible: false,
            isButtonDisabled: true,
            modalVisible:false,
            success:false,
            notificationToAll:true,
            loading:false,
        };
    }
    _showDateTimePicker = () => { 
        this.alertDate = ''; 
        this.setState({ isDateTimePickerVisible: true });
    }
    
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (datetime) => {
        let day = datetime.getUTCDate();
        let month = datetime.getUTCMonth()+1;
        let year = datetime.getUTCFullYear();
        let fullDate = day+'/'+month+'/'+year;
        let hours = datetime.getHours();
        let minutes = datetime.getMinutes();  
        if (minutes == 0)
	        minutes = '00'
        let fullTime = hours + ':' + minutes;
        this.setState({fullDate:fullDate, fullTime:fullTime,fullFormatDate:datetime})
        this.setState({isButtonDisabled: this.state.activityName.length <= 0});
        this._hideDateTimePicker();
    };

     createNewActivity = async() =>{
        if(this.state.fullTime.length > 0) {
            res = await this.props.onNewActivityHandler(this.state.fullDate,this.state.fullTime,this.state.activityName,this.state.fullFormatDate)
            if(res === 'ok')
                this.setState({success : true});
            //send notification to all users
            if(this.state.notificationToAll){
                const { hospital, first, last } = this.props;
                let activity = {
                    hospital: hospital,
                    coordinatorName: first +' '+ last,
                    nameActivity: this.state.activityName,
                    time: this.state.fullDate,
                }
                this.setState({loading:true})
                await sendNotificationToAllUsers(activity)
                this.setState({loading:false})
            }
            this.setState({modalVisible : true});
        }
        else{
            this.alertDate = 'נא לבחור תאריך';
            this.setState({isButtonDisabled:true});
        }
    }

    getModalMessage(hospital) { return (
        <Text style={[styles.subtitle,{color:'white'}]}>
            {this.state.success ?
            'פעילות נוספה בהצלחה' +'\n' + this.state.activityName  + '\nבתאריך ' + this.state.fullDate + '\nבשעה ' +this.state.fullTime + '\nבבית חולים ' + hospital : 
            'שגיאה! נסה שנית מאוחר יותר' }
        </Text>
    )}

    backToList = async ()=>{
        await this.props.onRefresh()
        this.props.navigation.goBack()
    }

    render () {
        const { hospital, first, last } = this.props;
        return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1, paddingTop:25}}>
                <Text style={styles.subtitle}>שם הרכז</Text>
                <Text style={[styles.inputField,styles.untouchableField]}>{first +' '+ last}</Text>
                <Text style={styles.subtitle}>מקום פעילות</Text>
                <Text style={[styles.inputField,styles.untouchableField]}>{hospital}</Text>
                <Text style={styles.subtitle}>שם הפעילות</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder= 'שם הפעילות'
                    underlineColorAndroid='transparent'
                    onChangeText={ (text) => { this.setState({activityName:text,isButtonDisabled: !(text.length > 0)}) } }
                    value={this.state.activityName}
                    maxLength={60}
                />
                <TouchableOpacity
                    rounded
                    onPress={this._showDateTimePicker}
                    style={[styles.button,{backgroundColor:'#009B77'}]}>
                    <Text style={styles.buttonText}>בחר תאריך וזמן פעילות</Text>
                </TouchableOpacity>
                <Text style={[styles.subtitle,styles.dateField]}>
                {
                    this.state.fullTime ?
                    'תאריך: ' + this.state.fullDate + ' שעה: ' + this.state.fullTime
                    : this.alertDate
                }
                </Text>
                <View style={{flexDirection:'row',justifyContent: "center"}}>
                    <Text style={{fontSize: 14,color:'#B93A32'}}>לשלוח התראות על האירוע לכל המשתמשים?</Text>
                    <Switch 
                    onTintColor={'#00A591'}
                    thumbTintColor={ this.state.notificationToAll ? '#79C753' : '#898E8C'}
                    tintColor={'#B93A32'}
                    style= {styles.switch}
                    onValueChange={() => this.setState({notificationToAll:!this.state.notificationToAll})}
                    value={this.state.notificationToAll}
                    />
                </View>
                <TouchableOpacity 
                    rounded
                    disabled = {this.state.isButtonDisabled || this.state.loading}
                    onPress={this.createNewActivity}
                    style={[styles.button, this.state.isButtonDisabled ? { backgroundColor:'#c6c6c6'} : { }]}>
                    {
                    !this.state.loading ? 
                    <Text style={styles.buttonText}>אישור</Text>
                    :
                    <View style={{flexDirection:'row',justifyContent: "center"}}>
                        <Text style={{fontSize: 18,color:'#FFFFFF'}}>שולח התראות</Text>
                        <ActivityIndicator size='large' color='#FFFFFF' /> 
                    </View>
                    }
                </TouchableOpacity>
            </View>
            </TouchableWithoutFeedback>

            <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
                minimumDate={this.currentDate}
                maximumDate={this.extraYear}
                mode={'datetime'}
           />
           
           <Modal
                visible={this.state.modalVisible}
                animationType={'slide'}
                transparent
                onRequestClose={() => this.setState({modalVisible:true})}
                >
                <View style={styles.modalContainer}>
                    {this.getModalMessage(hospital)}     
                    <TouchableOpacity
                    rounded
                    style={[styles.button,{marginTop:0}]}
                    onPress={() => { this.state.success ? this.backToList() : this.setState({modalVisible:false})}}
                    >
                    <Text style={styles.buttonText}>אישור</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </KeyboardAvoidingView>
        );
    }
}

export default CreateActivityView;