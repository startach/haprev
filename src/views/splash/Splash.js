import React, { Component } from 'react'
import { connect } from 'react-redux'
import SplashView from './SplashView'
import {authorize} from '../../store/modules/user'

class Splash extends Component{

    componentDidMount(){
        this.props.authorize(Expo.Constants.deviceId)
    }

    render(){
        const { navigate } = this.props.navigation;
        return (
            <SplashView navigate={navigate} />
        )
    }
}

export default connect(null,{authorize})(Splash)