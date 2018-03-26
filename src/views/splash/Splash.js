import React, { Component } from 'react'
import { connect } from 'react-redux'
import SplashView from './SplashView'
import {authorize,splash} from '../../store/modules/user'
import AppNav from '../../nav/AppNav'
import Register from '../../views/register/Register'

class Splash extends Component{

    componentDidMount(){
        this.props.splash(true)
        this.props.authorize(Expo.Constants.deviceId)
        setTimeout( () => this.props.splash(false), 2000)
    }

    render(){
        const {status,userStatus} = this.props
        if (status){
            if (userStatus=='user')
                return (
                    <AppNav />
                )
            if (userStatus=='no_user')
                return (
                    <Register />
                )
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