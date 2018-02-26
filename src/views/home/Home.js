import React, { Component } from 'react'
import { connect } from 'react-redux'
import HomeView from './HomeView'

class Home extends Component{

    render(){
        return (
            <HomeView user={this.props.user}/>
            //<HomeView user={{first: "Dan"}}/>
        )
    }
}

const mapStateToProps =state =>{ 
    return ({
                user:state.user
            })
    }

export default connect(mapStateToProps)(Home)
