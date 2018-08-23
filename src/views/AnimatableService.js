import React from 'react'
import * as Animatable from 'react-native-animatable'

export const AnimatableView = (props) => {
    return ( 
        <Animatable.View 
        animation= {props.animation ? props.animation : "zoomInUp"}
        easing={props.easing ? props.easing :"ease-in"}
        iterationCount={props.iterationCount ? props.iterationCount :1} 
        duration={props.duration ? props.duration :1200} 
        style={props.viewStyle}>
        {props.viewContent}
        </Animatable.View>
     );
}

export const AnimatableText = (props) => {
    return ( 
        <Animatable.Text
        animation= {props.animation ? props.animation : "pulse"}
        easing={props.easing ? props.easing :"ease-in"}
        iterationCount={props.iterationCount ? props.iterationCount :"infinite"} 
        duration={props.duration ? props.duration :1500} 
        style={props.textStyle}>
        {props.textContent}
        </Animatable.Text>
     );
}
