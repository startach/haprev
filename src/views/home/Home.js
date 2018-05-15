import React from 'react'
import {View} from 'react-native'
import Messages from '../messages/Messages'
import HomeView from './HomeView'
import { connect } from 'react-redux'
import { getHospitalName } from '../adminActivities/AdminActivitiesService'

class Home extends React.Component{
    constructor(props) {
        super(props)
        this.state = {hospitalName: ''};
    }
    async componentWillMount() {
        let _hospitalName = await getHospitalName(this.props.coordinator)
        await this.setState({hospitalName:_hospitalName})
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
                />
            </View>
        )
    }
}

const mapStateToProps = state =>{
    return ({
               first:state.user.user.first,
               last:state.user.user.last,
               coordinator:state.user.user.coordinator
            })
    }

export default connect(mapStateToProps)(Home)
