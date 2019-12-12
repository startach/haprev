import { StackNavigator } from 'react-navigation'
import Register from '../views/register/Register'
import SignIn from '../views/register/SignIn'

export default RegisterNav = StackNavigator(
  {
    Register: {
      screen: Register
    },
    SignIn: {
      screen: SignIn
    }
  },
  { headerMode: 'none' }
)
