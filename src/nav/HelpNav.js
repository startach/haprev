import { StackNavigator } from 'react-navigation';
import Help from '../views/help/Help'

export default StackNavigator({
        Help:{
                screen: Help,
                headerMode: 'screen',
                navigationOptions: {
                    title:'עזרה',
                }
            },
        },
    )