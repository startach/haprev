import React, {Component} from 'react'
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  TextInput,
  KeyboardAvoidingView
} from 'react-native'
import {adminActivityStyle as styles, modalActivityStyle as modalStyles} from '../adminActivities/styles'
import {FontAwesome} from '@expo/vector-icons';
import Toast from 'react-native-easy-toast';
import {showToast} from '../../utils/taost';

const {width} = Dimensions.get('screen');

class EventRegistrationView extends Component {
  state = {
    displayCancelEventDialog: false,
    extraParticipants: null
  }

  showCancelEventDialog = () =>
    this.setState({displayCancelEventDialog: true})

  hideCancelEventDialog = () =>
    this.setState({displayCancelEventDialog: false});

  registration = async () => {
    const res = await this.props.registerUserEventHandler(this.state.extraParticipants)
    if (res !== 'ok')
      alert("שגיאה בהרשמה, אנא נסה שנית מאוחר יותר")
    this.hideCancelEventDialog()
  }

  onChanged = (text) => {
    let newText = ''
    let numbers = '0123456789'

    for (let i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i]
      }
      else {
        alert("please enter numbers only") // your call back function
      }
    }
    this.setState({extraParticipants: newText})
  }

  alreadyExists = () => {
    showToast(this.refs, 'אתה כבר רשום לפעילות זו');
  }

  render() {
    return (
      <React.Fragment>
        <Toast ref="toast" style={{backgroundColor:'#C2185B'}} positionValue={180} opacity={0.8}/>
        <View>
          {this.props.registeredNow ?
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={async () => {
                await this.props.createEventOnDeviceCalendar()
              }}>
                <View style={[styles.cancelButton, {
                  width: width * 0.333,
                  backgroundColor: '#4283F2',
                  flexDirection: 'column',
                  alignSelf: 'center'
                }]}>
                  <Text style={[styles.cancelText, {fontSize: 14, marginBottom: 3}]}>עדכן בלוח שנה</Text>
                  <FontAwesome style={[styles.cancelIcon, {backgroundColor: 'transparent'}]} name='calendar-o' size={20}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.alreadyExists}>
                <View style={[styles.cancelButton, {
                  width: width * 0.333,
                  backgroundColor: '#009B77',
                  flexDirection: 'column',
                  alignSelf: 'center'
                }]}>
                  <Text style={[styles.cancelText, {fontSize: 14, marginBottom: 3}]}>נרשמת לפעילות</Text>
                  <FontAwesome style={[styles.cancelIcon, {backgroundColor: 'transparent'}]} name='check-circle'
                              size={20}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Institutes');
                this.props.navigation.navigate('HomeRoute')
              }}>
                <View style={[styles.cancelButton, {
                  width: width * 0.333,
                  backgroundColor: '#C2185B',
                  flexDirection: 'column',
                  alignSelf: 'center'
                }]}>
                  <Text style={[styles.cancelText, {fontSize: 14, marginBottom: 3}]}>חזור למסך הבית</Text>
                  <FontAwesome style={[styles.cancelIcon, {backgroundColor: 'transparent'}]} name='home' size={20}/>
                </View>
              </TouchableOpacity>
            </View>
            :
            <TouchableOpacity onPress={this.showCancelEventDialog}>
              <View style={[styles.cancelButton, {backgroundColor: '#009B77'}]}>
                <Text style={styles.cancelText}>הרשם להתנדבות</Text>
                <FontAwesome style={[styles.cancelIcon, {backgroundColor: 'transparent'}]} name='thumbs-up' size={30}/>
              </View>
            </TouchableOpacity>
            
          }
          <Modal
            transparent
            visible={this.state.displayCancelEventDialog}
            animationType={'slide'}
            onRequestClose={() => this.setState({displayCancelEventDialog: true})}>
            {!this.props.process ?
              <KeyboardAvoidingView contentContainerStyle={{flexDirection: "column"}} behavior="position" enabled>
                <View style={modalStyles.modalContainer}>
                  <Text style={[modalStyles.title, {color: '#fff'}]}> האם להירשם לההתנדבות? {'\n'} </Text>
                  <View style={modalStyles.extraParticipantsContainer}>
                    <Text style={[modalStyles.extraParticipants, {color: '#fff'}]}> כמה אנשים יצטרפו? {'\n'} </Text>
                    <TextInput
                      style={styles.inputFieldExtraParticipants}
                      placeholder='מספר משתתפים נוספים'
                      underlineColorAndroid='transparent'
                      onChangeText={(text) => this.onChanged(text)}
                      value={(this.state.extraParticipants && this.state.extraParticipants.toString()) || null}
                      maxLength={2}
                    />
                  </View>
                  <View style={[modalStyles.buttonsContainer, {paddingTop: 5}]}>
                    <TouchableOpacity
                      rounded
                      style={modalStyles.modalButton}
                      onPress={() => {
                        this.hideCancelEventDialog()
                      }}
                    >
                      <Text style={modalStyles.modalRegisterButtonText}>ביטול</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      rounded
                      style={[modalStyles.modalButton, {backgroundColor: '#009B77'}]}
                      onPress={async () => await this.registration()}
                    >
                      <Text style={modalStyles.modalRegisterButtonText}>הירשם</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAvoidingView>
              :
              <View style={modalStyles.modalContainer}>
                <Text style={[modalStyles.title, {color: '#fff'}]}> רושם להתנדבות... {'\n'} </Text>
                <ActivityIndicator size='large' color='#fff'/>
              </View>
            }
          </Modal>

        </View>
      </React.Fragment>
    )
  }
}

export default EventRegistrationView