import { StackNavigator } from 'react-navigation';
import Splash from '../views/splash/Splash'
import Register from '../views/register/Register'
import AppNav from "./AppNav";

let MainStack = StackNavigator(
    {
        Register:{
            screen: Register,
            headerMode: 'none',
            header: null,
            navigationOptions: { header: null, },
        },
        Splash:{
            screen: Splash,
            headerMode: 'none',
            header: null,
            navigationOptions: { header: null, },
        },
        AppNav:{
            screen: AppNav,
            headerMode: 'none',
            header: null,
            navigationOptions: { header: null, },
        },
    },
    {
        initialRouteName: 'Splash',
        headerMode: 'none',
        lazy: true,
    }
)

export default MainStack;
