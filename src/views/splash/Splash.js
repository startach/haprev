import React, { Component } from 'react'
import { connect } from 'react-redux'
import SplashView from './SplashView'
import {authorize,splash} from '../../store/modules/user'
import { getInstitutes } from '../../store/modules/Institutes'
import AppNav from '../../nav/AppNav'
import RegisterNav from '../../nav/RegisterNav'

class Splash extends Component{

    async componentDidMount(){
        this.props.splash(true)
        await this.props.getInstitutes()
        this.props.authorize(Expo.Constants.deviceId)
        setTimeout( () => this.props.splash(false), 2500)
    }

    render(){
        const {status,userStatus} = this.props
        if (status){
            if (userStatus=='user')
                return (
                    <AppNav/>
                )
            if (userStatus=='no_user')
                return (
                    <RegisterNav/>
                )
        }
        return (
            <SplashView/>         
        )
    }
}

const mapStateToProps = state => ({
    status: state.user.status,
    userStatus: state.user.authStatus
})

export default connect(mapStateToProps,{authorize,splash,getInstitutes})(Splash)