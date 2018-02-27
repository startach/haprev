import React, { Component } from 'react'
import HelpView from './HelpView'
import { connect } from 'react-redux'
import {HelpRequest} from '../../services'

class Help extends Component{
    render(){
        return(
        <HelpView 
            first={this.props.first} 
            last={this.props.last} 
            email={this.props.email}
            navigation={this.props.navigation}
        />
        )}
}

helpReqHandler = async (first,last,email,content) => {
    return await HelpRequest(first,last,email,content);
}

const mapStateToProps = state =>{
return ({
           first:state.user.user.first,
           last:state.user.user.last,
           email:state.user.user.email,
        })
}

export default connect(mapStateToProps)(Help)
//