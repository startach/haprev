import { StackNavigator } from 'react-navigation';
import HomeScreen from '../views/App';
import DashboardScreen from '../views/Dashboard';
import SearchScreen from '../views/search';
import HospitalScreen from '../views/hospitalList/HospitalList';
import SplashScreen from '../views/Splash';

export default StackNavigator(
  {
    Home: {
      screen: HomeScreen,
      headerMode: 'none',
      header: null,
      navigationOptions: {
        header: null
      }
    },
    Dashbaord: { screen: DashboardScreen },
    Search: { screen: SearchScreen },
    Hospital: { screen: HospitalScreen },
    Splash: {
      screen: SplashScreen,
      headerMode: 'none',
      header: null,
      navigationOptions: {
        header: null
      }
    },
  },
  {
    initialRouteName: 'Splash'
  }
);
