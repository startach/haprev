import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, Keyboard, Modal, TouchableWithoutFeedback, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import styles from './HelpViewStyle'

const SUCCESS_SEND = { title: 'ההודעה נשלחה בהצלחה!', subtitle: 'צוות מהפכה של שמחה יענה בהקדם' }
const FAIL_SEND = { title: 'בעיה בשליחה!', subtitle: 'נסה שוב מאוחר יותר' }

class HelpView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      modalVisible: false,
      isButtonDisabled: true,
      success: false,
      loading: false
    }
  }

  Validation = (inputText) => inputText && inputText.length > 0

  async SandMessage() {
    const { first, last, email, phone } = this.props
    const content = this.state.content.replace(/\n/g, ' ')
    try {
      this.setState({ loading: true })
      const sendEmailFirebaseFunctionUrl = `https://us-central1-happrev.cloudfunctions.net/sendMail?name=${first} ${last}&email=${email}&phone=${phone}&content=${content}`
      fetch(sendEmailFirebaseFunctionUrl)
        .then((response) => {
          this.setState({ success: true, modalVisible: true, loading: false })
        }).catch((error) => {
          this.setState({ modalVisible: true, loading: false })
          console.log("TCL: HelpView -> componentDidMount -> catch error", error)
        })
    } catch (error) {
      console.log("TCL: HelpView -> componentDidMount -> error", error)
    }
  }

  render() {
    const { first, last, email, phone, navigation } = this.props
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={styles.titlesContainer}>
              <Text style={styles.title}>נתקלת בבעיה? צריך עזרה?</Text>
              <Text style={styles.subtitle}>בדיוק בשביל זה אנחנו פה! {'\n'} שלח לנו הודעה ונחזור אליך בהקדם.</Text>
            </View>
            <Text style={[styles.inputField, styles.untouchableField]}>{first + ' ' + last}</Text>
            <Text style={[styles.inputField, styles.untouchableField]}>{email || phone}</Text>
            <TextInput
              ref='content'
              label='תוכן'
              style={styles.inputField}
              placeholder='תוכן'
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({ content: text, isButtonDisabled: !this.Validation(text) })}
              value={this.state.content}
              maxLength={500}
              multiline
            />
            <View style={{ paddingBottom: 50 }}>
              <TouchableOpacity
                rounded
                disabled={this.state.isButtonDisabled}
                onPress={() => this.SandMessage()}
                style={[styles.button, this.state.isButtonDisabled ? { backgroundColor: '#c6c6c6' } : {}]}
              >
                {!this.state.loading ?
                  <Text style={styles.buttonText}>שלח</Text>
                  : <ActivityIndicator size='large' color='#fff' />
                }
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <Modal
          visible={this.state.modalVisible}
          animationType='slide'
          transparent
          onRequestClose={() => this.setState({ modalVisible: true })}
        >
          <View style={styles.modalContainer}>
            <Text style={[styles.title, { color: '#fff' }]}>{this.state.success ? SUCCESS_SEND.title : FAIL_SEND.title} </Text>
            <Text style={[styles.subtitle, { color: '#fff' }]}>{'\n'} {this.state.success ? SUCCESS_SEND.subtitle : FAIL_SEND.subtitle} {'\n'}  </Text>
            <TouchableOpacity
              rounded
              style={[styles.button, { marginTop: 0 }]}
              onPress={() => { this.state.success ? navigation.navigate('HomeRoute') : this.setState({ modalVisible: false, isButtonDisabled: false }) }}
            >
              <Text style={styles.buttonText}>אישור</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    )
  }
}

export default HelpView
