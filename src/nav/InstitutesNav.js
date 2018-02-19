import { StackNavigator } from 'react-navigation';
import Institutes from '../views/institutes/Institutes'

export default StackNavigator({
        Institutes:{
                screen: Institutes,
                headerMode: 'screen',
                navigationOptions: {
                    title:'בתי חולים',
                }
            },
        },
    )