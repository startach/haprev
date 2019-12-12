import React, { Component } from 'react'
import { connect } from 'react-redux'
import SplashView from './SplashView'
import { authorize, splash } from '../../store/modules/user'
import { getInstitutes } from '../../store/modules/Institutes'
import AppNav from '../../nav/AppNav'
import RegisterNav from '../../nav/RegisterNav'

class Splash extends Component {
  async componentDidMount () {
    const start = new Date().getTime()
    this.props.splash(true)
    await this.props.getInstitutes()
    await this.props.authorize(Expo.Constants.deviceId)
    const totalTime = new Date().getTime() - start
    setTimeout(() => {
      this.props.splash(false)
    }, 2000 - totalTime)
  }

  render () {
    const { splashStatus, userStatus } = this.props
    if (!splashStatus) {
      if (userStatus === 'user') return <AppNav />
      if (userStatus === 'no_user') return <RegisterNav />
    }

    return <SplashView />
  }
}

const mapStateToProps = state => ({
  splashStatus: state.user.splashStatus,
  userStatus: state.user.authStatus
})

export default connect(
  mapStateToProps,
  { authorize, splash, getInstitutes }
)(Splash)
