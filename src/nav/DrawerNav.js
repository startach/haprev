import { DrawerNavigator } from 'react-navigation';
import Home from '../views/home/Home'
import Institutes from '../views/institutes/Institutes'
import Profile from '../views/profile/Profile'

export default DrawerNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            drawerLabel: 'מסך הבית',
            title: 'מסך הבית',
        }
    },
    Institutes: {
        screen: Institutes,
        navigationOptions: {
            drawerLabel: 'בתי חולים',
            title: 'בתי חולים',
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            drawerLabel: 'הפרופיל שלי',
            title: 'הפרופיל שלי',
        }
    },
})