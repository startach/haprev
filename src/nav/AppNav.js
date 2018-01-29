import { StackNavigator } from 'react-navigation';
import DrawerNav from './DrawerNav'

export default StackNavigator({
        DrawerNav:{
            screen: DrawerNav,
            headerMode: 'screen',
            navigationOptions: {
                headerTitle: 'דף הבית',
            },
        },
    },
    { initialRouteName: 'DrawerNav',}
)