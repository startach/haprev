import { StackNavigator } from 'react-navigation';
import SearchHospital from '../views/hospitalList/HospitalList';
import SelectDateScreen from '../views/hospitalList/SelectDate';

export default StackNavigator(
  {
    SearchHospital: { screen: SearchHospital ,
      navigationOptions:{
        header: null,
      }},
    SelectDate: { screen: SelectDateScreen,
      navigationOptions:{
        header:null,
      }
     },
  },
  {
    initialRouteName: 'SearchHospital',
  },
);
