import React, { Component } from 'react'
import { connect } from 'react-redux'
import SplashView from './SplashView'
import {authorize,splash} from '../../store/modules/user'

class Splash extends Component{

    componentDidMount(){
        this.props.splash(true)
        this.props.authorize(Expo.Constants.deviceId)
        setTimeout( () => this.props.splash(false), 2000)
    }

    render(){
        const {status,userStatus ,navigation} = this.props
        // console.log('Splash.js: render with status=',status)
        if (status){
            if (userStatus=='user')
                navigation.navigate('AppNav')
            if (userStatus=='no_user')
                navigation.navigate('Register')
        }
        return (
            <SplashView  />
        )
    }
}

const mapStateToProps = state => ({
    status: state.user.status,
    userStatus: state.user.authStatus
})

export default connect(mapStateToProps,{authorize,splash})(Splash)