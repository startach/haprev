import React, { Component } from 'react'
import RegisterView from './RegisterView'
import { connect } from 'react-redux'
import { register } from '../../store/modules/user';


class Register extends Component{
    render(){
        return(
        <RegisterView user={this.props.user} title="חשבון חדש" actionTitle="הרשמה"
          onAction = {(user) => {console.log(user);
            this.props.register(user);}}/>
        )}
}

const mapStateToProps =state =>{ 
return ({
            user:state.user.user
        })
}

export default connect(mapStateToProps, { register })( Register)
