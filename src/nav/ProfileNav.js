import { StackNavigator } from 'react-navigation';
import Profile from '../views/profile/Profile'

export default StackNavigator({
        Profile:{
                screen: Profile,
                headerMode: 'screen',
                navigationOptions: {
                    title:'הפרופיל שלי',
                }
            },
        },
    )