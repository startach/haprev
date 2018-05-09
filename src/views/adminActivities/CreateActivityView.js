import React, { Component } from 'react';
import {View, Text, TextInput, KeyboardAvoidingView, Keyboard, TouchableOpacity, Modal, TouchableWithoutFeedback} from "react-native";
import DateTimePicker from 'react-native-modal-datetime-picker';
import {CreateActivityStyle as styles } from './styles';

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
            isDateTimePickerVisible: false,
            isButtonDisabled: true,
            modalVisible:false,
            success:false,
        };
    }
    _showDateTimePicker = () => { 
        this.alertDate = ''; 
        this.setState({ isDateTimePickerVisible: true });
    }
    
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (datetime) => {
        console.log('A date has been picked-: ', datetime);
        let day = datetime.getUTCDate();
        let month = datetime.getUTCMonth()+1;
        let year = datetime.getUTCFullYear();
        let dayOfWeek = datetime.getUTCDay()+1;
        let fullDate = day+'/'+month+'/'+year;
        let hours = datetime.getHours();
        let minutes = datetime.getMinutes();  
        let fullTime = hours + ':' + minutes;
        this.setState({fullDate:fullDate, fullTime:fullTime})
        this.setState({isButtonDisabled: this.state.activityName.length <= 0});
        console.log("New Activity:", this.state.activityName, this.state.fullDate, this.state.fullTime);
        this._hideDateTimePicker();
    };

    createNewActivity = () =>{
        if(this.state.fullTime.length > 0) {
            //do stuff with the data
            if(true)
                this.setState({success : true});
            this.setState({modalVisible : true});
            console.log("GOOD")
        }
        else{
            this.alertDate = 'נא לבחור תאריך';
            this.setState({isButtonDisabled:true});
        }
    }

    render () {
        const { params } = this.props.navigation.state;
        return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1, paddingTop:25}}>
                <Text style={styles.subtitle}>שם הרכז</Text>
                <Text style={[styles.inputField,styles.untouchableField]}>{params.first +' '+ params.last}</Text>
                <Text style={styles.subtitle}>מקום פעילות</Text>
                <Text style={[styles.inputField,styles.untouchableField]}>{params.hospital}</Text>
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
                    style={[styles.button,{backgroundColor:'green'}]}>
                    <Text style={styles.buttonText}>בחר תאריך וזמן פעילות</Text>
                </TouchableOpacity>
                <Text style={[styles.subtitle,styles.dateField]}>
                {
                    this.state.fullTime ?
                    'תאריך: ' + this.state.fullDate + ' שעה: ' + this.state.fullTime
                    : this.alertDate
                }
                </Text>
                <TouchableOpacity 
                    rounded
                    disabled = {this.state.isButtonDisabled}
                    onPress={this.createNewActivity}
                    style={[styles.button, this.state.isButtonDisabled ? { backgroundColor:'#c6c6c6'} : { }]}>
                    <Text style={styles.buttonText}>אישור</Text>
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
                <Text style={[styles.subtitle,{color:'white'}]}>{this.state.success ? 'פעילות נוספה בהצלחה' : 'שגיאה! נסה שנית מאוחר יותר'} {'\n'}  </Text>        
                    <TouchableOpacity
                    rounded
                    style={[styles.button,{marginTop:0}]}
                    onPress={() => { this.state.success ? this.props.navigation.goBack() : this.setState({modalVisible:false})}}
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