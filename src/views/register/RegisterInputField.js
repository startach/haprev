import React, { Component } from 'react'
import {View,Text,Image,TextInput,StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop: 18, marginHorizontal: 36,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderBottomColor: 'white', borderBottomWidth: 1,
    },
    input: {
        height: 40,
        width: '80%',
        color:'white',
        fontSize: 26,
        fontWeight: '400',
        textAlign: 'right',
    },
    image: {
        height: 32, width: 32,
        padding: 4
    },
})

export default class RegisterInputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      imageSource: '',
      secured: false,
    };
  }

  render() {
    return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={this.props.imageSource} />
      <TextInput
        style={styles.input}
        value={this.state.text}
        underlineColorAndroid='transparent'
        placeholder={this.props.placeholder}
        placeholderTextColor="white"
        secureTextEntry={this.props.secured}
        onChangeText={(text) => this.setState({text})}
      />
    </View>
    );
  }
}
