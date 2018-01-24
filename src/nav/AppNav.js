import { StackNavigator } from 'react-navigation';
import Home from '../views/home/Home'
import Institutes from '../views/institutes/Institutes'
import Profile from '../views/profile/Profile'

export default StackNavigator({
    Home:{
        screen: Home,
        headerMode: 'none',
        header: null,
        navigationOptions: { header: null, },
    },
    Institutes:{
        screen: Institutes,
        headerMode: 'none',
        header: null,
        navigationOptions: { header: null, },
    },
    Profile:{
        screen: Profile,
        headerMode: 'none',
        header: null,
        navigationOptions: { header: null, },
    },
    },
        { initialRouteName: 'Home',}
)