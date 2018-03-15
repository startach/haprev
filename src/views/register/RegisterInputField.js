import React, { Component } from 'react'
import {View,Text,Image,TextInput,StyleSheet} from 'react-native';

function obj2string (o) {
  var seen=[];
  var jso=JSON.stringify(o, function(key,val){
    if (val != null && typeof val == "object") {
      if (seen.indexOf(val) >= 0) {
          return "_cyclic_";
      }
      seen.push(val);
    }
    return val;
  });
  return jso;
}

const styles = StyleSheet.create({
    container: {
        marginTop: 18, marginHorizontal: 36,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderBottomColor: 'white', borderBottomWidth: 1,
    },
    focus: {
      backgroundColor: 'gray'
    },
    input: {
        height: 40,
        width: '80%',
        color:'white',
        fontSize: 22,
        fontWeight: '400',
        textAlign: 'right',
    },
    image: {
        height: 32, width: 32,
        padding: 4,
        marginRight:5,
    },
})

export default class RegisterInputField extends Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
    this.state = {
      text: '',
      imageSource: '',
      secured: false,
      focusDiff: {},
    };
  }

  focus() {
    this.textInput.focus();
  }

  render() {
    return (
    <View style={[styles.container, this.state.focusDiff]}>
      <Image
        style={styles.image}
        source={this.props.imageSource} />
      <TextInput
        onBlur={() => this.setState({focusDiff: {}})}
        onFocus={() => this.setState({focusDiff: styles.focus})}
        style={styles.input}
        returnKeyType={this.props.returnKeyType || "next"}
        enablesReturnKeyAutomatically={true}
        value={this.state.text}
        underlineColorAndroid='transparent'
        placeholder={this.props.placeholder}
        placeholderTextColor="white"
        secureTextEntry={this.props.secured}
        keyboardType={this.props.keyboardType || 'default'}
        ref={input => {this.textInput = input;}}
        onChangeText={(text) => {this.setState({text});
          this.props.onChangeText(text);
        }}
        onSubmitEditing={(event) => {this.props.onSubmitEditing(event)}}
      />
    </View>
    );
  }
}
