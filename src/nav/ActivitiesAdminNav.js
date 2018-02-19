import { StackNavigator } from 'react-navigation';
import ActivitiesAdmin from '../views/activitiesAdmin/ActivitiesAdmin'
import Activity from '../views/activitiesAdmin/Activity'

export default StackNavigator({
    ActivitiesAdmin:{
        screen: ActivitiesAdmin,
        headerMode: 'screen',
        navigationOptions: {
            title:'ניהול התנדבויות',
        }},
    Activity:{
        screen: Activity,
        headerMode: 'screen',
        navigationOptions: {
            title:'פעילות',
        }},
    },
)