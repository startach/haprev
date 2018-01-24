import { StackNavigator } from 'react-navigation';
import Splash from '../views/splash/Splash'
import Register from '../views/register/Register'

export default StackNavigator({
    Splash:{
        screen: Splash,
        headerMode: 'none',
        header: null,
        navigationOptions: { header: null, },
    },
    Register:{
        screen: Register,
        headerMode: 'none',
        header: null,
        navigationOptions: { header: null, },
    },
    },
        { initialRouteName: 'Splash',}
)