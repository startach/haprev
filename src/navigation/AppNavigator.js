import { StackNavigator } from 'react-navigation';
import HomeScreen from '../views/App';
import DashboardScreen from '../views/Dashboard';
import SearchScreen from '../views/search';
import HospitalScreen from '../views/hospitalList/HospitalList';

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
    Hospital: { screen: HospitalScreen }
  },
  {
    initialRouteName: 'Hospital'
  }
);
