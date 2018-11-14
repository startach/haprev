import React, { Component } from 'react'
import HelpView from './HelpView'
import { connect } from 'react-redux'
import { helpReqHandler } from './HelpService'

class Help extends Component{
    render(){
        return(
        <HelpView 
            first={this.props.first} 
            last={this.props.last} 
            email={this.props.email}
            phone={this.props.phone}
            navigation={this.props.navigation}
            onHelpReq = {helpReqHandler}
        />
    )}
}

const mapStateToProps = state =>{
return ({
           first:state.user.user.first,
           last:state.user.user.last,
           email:state.user.user.email,
           phone:state.user.user.phone,
        })
}

export default connect(mapStateToProps)(Help)