import { StackNavigator } from 'react-navigation';
import SearchHospital from '../views/hospitalList/HospitalList';
import SelectDateScreen from '../views/hospitalList/SelectDate';

export default StackNavigator(
  {
    SearchHospital: { screen: SearchHospital },
    SelectDate: { screen: SelectDateScreen },
  },
  {
    initialRouteName: 'SearchHospital',
  },
);
