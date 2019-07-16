import { createAppContainer, createStackNavigator } from 'react-navigation'
import Login from '../Login'
import Register from '../Register'
import Maps from '../Maps'
const AppNavigator = createStackNavigator({
    Login:{
        screen:Login
    },
    Register:{
        screen:Register
    },
    Maps:{
        screen:Maps
    }
},
{
    defaultNavigationOptions: {
        header: null,
      }
})

const HomeContainer = createAppContainer(AppNavigator)

export default HomeContainer