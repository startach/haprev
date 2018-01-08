import React from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';

const InputBox = ({label, value, onChangeText, isMultiline, _returnKeyType }) => {
   const maxLenth =25; const numberOfLines = 1;
    if(isMultiline){
        this.maxLenth = 180;
        this.numberOfLines = 4;
    }
    const { inputTextStyle, labelStyle, containerStyle ,inputMultiTextStyleHoshi } = styles;
    return(
        <View style={styles.containerStyle}>
        <Hoshi
            label={label}
            borderColor={'#D81A4C'}
            value= {value}
            onChangeText={onChangeText}
            labelStyle={{}}
            inputStyle={{paddingRight:25, color:'black' }}
            style={styles.inputMultiTextStyleHoshi}
            returnKeyType = {"next"}
            multiline = {isMultiline}
            maxLength = {this.maxLength}
            numberOfLines = {this.numberOfLines}
        />
        </View> 
    );
};

const styles = StyleSheet.create({
    inputTextStyleHoshi: {
      position: 'absolute',
      bottom: 2,
      left: 25,
      right: 25,
      paddingTop: 0,
      margin:50,
    },
    containerStyle:{
        paddingTop: 75
    },
    inputMultiTextStyleHoshi: {
      position: 'absolute',
      bottom: 2,
      left: 25,
      right: 25,
      paddingTop: 0,
      margin:50,
    //  height: 300, 
   //   lineHeight: 40,
   //   textAlignVertical: 'top'
      },
});

export default InputBox;