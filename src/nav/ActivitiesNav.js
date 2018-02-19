import { StackNavigator } from 'react-navigation';
import Activities from '../views/activities/Activities'

export default StackNavigator({
        Activities:{
                screen: Activities,
                headerMode: 'screen',
                navigationOptions: {
                    title:'ההתנדבויות שלי',
                }
            },
        },
    )