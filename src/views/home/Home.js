import React from 'react'
import {View, BackHandler, Platform, ToastAndroid} from 'react-native'
import Messages from '../messages/Messages'
import HomeView from './HomeView'
import { connect } from 'react-redux'
import {getImages} from './HomeService'

class Home extends React.Component{
    constructor(props) {
        super(props)
        this.state = {hospitalName: '', myNextEvent: null,images:[],exit:0};
        this.onBackClicked = this._onBackClicked.bind(this);
    }
          
    componentWillUnmount() {
        if (Platform.OS === 'android')
            BackHandler.removeEventListener("hardwareBackPress", this.onBackClicked);
    }

    async componentWillMount() {
        if (Platform.OS === 'android') 
            BackHandler.addEventListener('hardwareBackPress', this.onBackClicked);

        let _hospitalName = ''
        let myNextEvent = await this.findMyNextEvent(this.props.myActivities)
        if(this.props.coordinator > 0){
            _hospitalName = this.state.hospitalName
            if(!_hospitalName)
                _hospitalName = await this.props.institutes[this.props.coordinator-1].name || null
        }
        images = await getImages()
        await this.setState({hospitalName:_hospitalName,myNextEvent:myNextEvent,images:images})
    }
      
    _onBackClicked = () => {
        if(this.state.exit>0)
            BackHandler.exitApp()
        else{
            ToastAndroid.show('בטוח? לחץ שוב בכדי לצאת', ToastAndroid.SHORT);
            this.setState({exit:1})
            setTimeout( () => this.setState({exit:0}), 1500)
        }
        return true;
    } 

      

    findMyNextEvent = async(myActivities) => {
        let myNextEvent = null
        currDate = new Date()
        minDate = (new Date(currDate.getUTCFullYear()+2, currDate.getUTCMonth(), currDate.getUTCDate())).toISOString()
        currDate = currDate.toISOString()
            for(var i in myActivities){
                for(var j in myActivities[i]){
                    event = myActivities[i][j]
                    if(event.fullFormatDate > currDate){
                        if(event.fullFormatDate < minDate){
                            minDate = event.fullFormatDate
                            myNextEvent = event
                        }
                    }
                }
            }
        if(myNextEvent){
            fulldate = new Date(myNextEvent.fullFormatDate)
            shortDate =  fulldate.getDate() + "/" + (fulldate.getMonth() + 1) + "/" + fulldate.getFullYear()
            myNextEvent['date'] = shortDate
        }
        return myNextEvent
        
    }

    registerActivityView = () => { this.props.navigation.navigate('InstitutesRoute') }

    activityView = () => { this.props.navigation.navigate('ActivitiesRoute') }
    
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
                    myNextEvent = {this.state.myNextEvent}
                    images={this.state.images}
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
            myActivities: state.user.user.activities || null,
        })
    }

export default connect(mapStateToProps)(Home)
