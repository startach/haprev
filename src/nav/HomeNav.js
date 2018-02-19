import { StackNavigator } from 'react-navigation';
import Home from '../views/home/Home'

export default StackNavigator({
        Home:{
                screen: Home,
                headerMode: 'screen',
                navigationOptions: {
                    title:'מסך הבית',
                }
            },
        },
    )