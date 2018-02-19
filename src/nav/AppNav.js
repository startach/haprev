import { DrawerNavigator } from 'react-navigation';
import HomeNav from './HomeNav'
import InstitutesNav from './InstitutesNav'
import ProfileNav from './ProfileNav'
import ActivitiesNav from './ActivitiesNav'
import ActivitiesAdminNav from './ActivitiesAdminNav'
import HelpNav from './HelpNav'

export default DrawerNavigator({
    Home: {
        screen: HomeNav,
        navigationOptions: {
            drawerLabel: 'מסך הבית',
        }
    },
    Institutes: {
        screen: InstitutesNav,
        navigationOptions: {
            drawerLabel: 'בתי חולים',
        }
    },
    Profile: {
        screen: ProfileNav,
        navigationOptions: {
            drawerLabel: 'הפרופיל שלי',
        }
    },
    Activities: {
        screen: ActivitiesNav,
        navigationOptions: {
            drawerLabel: 'ההתנדבויות שלי',
        }
    },
    ActivitiesAdmin: {
        screen: ActivitiesAdminNav,
        navigationOptions: {
            drawerLabel: 'ניהול התנדבויות',
        }
    },
    Help: {
        screen: HelpNav,
        navigationOptions: {
            drawerLabel: 'עזרה',
        }
    },
})