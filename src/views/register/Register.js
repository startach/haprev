import React, { Component } from 'react'
import RegisterView from './RegisterView'
import { connect } from 'react-redux'


class Register extends Component{
    render(){
        return(
        <RegisterView user={this.props.user} />
        )}
}

const mapStateToProps =state =>{ 
return ({
            user:state.user.user
        })
}

export default connect(mapStateToProps)( Register)
