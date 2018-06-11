import React from 'react'
import {View} from 'react-native'
import Messages from '../messages/Messages'
import HomeView from './HomeView'
import { connect } from 'react-redux'

class Home extends React.Component{
    constructor(props) {
        super(props)
        this.state = {hospitalName: ''};
    }
    async componentWillMount() {
        let _hospitalName = this.state.hospitalName
        if(!_hospitalName)
            _hospitalName = this.props.institutes[this.props.coordinator-1].name
        await this.setState({hospitalName:_hospitalName})
    }
    registerActivityView = () => { this.props.navigation.navigate('Institutes') }

    activityView = () => { this.props.navigation.navigate('Activities') }
    
    createActivityView = () =>{
        const {first,last,coordinator,appId} = this.props
        const hospital = this.state.hospitalName
        this.props.navigation.navigate('CreateActivity',{first,last,hospital,appId,coordinator,onRefresh: () =>this.props.navigation.navigate('AdminActivities')});
    }

    render() {
        return(
            <View>
                <Messages/>
                <HomeView 
                    first={this.props.first} 
                    last={this.props.last}
                    coordinator={this.props.coordinator}
                    hospital={this.state.hospitalName}
                    registerActivityView={this.registerActivityView}
                    createActivityView={this.createActivityView}
                    activityView={this.activityView}
                />
            </View>
        )
    }
}

const mapStateToProps = state =>{
    return ({
            first:state.user.user.first,
            last:state.user.user.last,
            coordinator:state.user.user.coordinator,
            appId:state.user.user.appId,
            institutes:state.institutes.institutes,            
        })
    }

export default connect(mapStateToProps)(Home)
