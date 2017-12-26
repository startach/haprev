import React from 'react'
import {View,Text,Image,TextInput,StyleSheet} from 'react-native';

const styles = StyleSheet.create({

})

const RegisterInputField = () => (
    <View style={{borderColor:'red', height:30}}>
        <View>
            <TextInput placeHolder={'aaaa'} ></TextInput>
            <Image></Image>
        </View>
        <View></View>
    </View>
);

export default RegisterInputField
