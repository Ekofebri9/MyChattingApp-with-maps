import { createAppContainer, createStackNavigator,createSwitchNavigator } from 'react-navigation'
import Login from '../Login'
import Register from '../Register'
import Maps from '../Maps'
import Chat from '../Chat'
import User from '../User'
import IsLogin from '../IsLogin'
const Auth = createStackNavigator({
    Login:{
        screen:Login
    },
    Register:{
        screen:Register
    }
},
{
    defaultNavigationOptions: {
        header: null,
      }
})
const App = createStackNavigator({
    Maps:{
        screen:Maps
    },
    Chat: {
        screen: Chat
    }
})
const HomeContainer = createAppContainer(createSwitchNavigator(
    {
        IsLogin: IsLogin,
        App: App,
        Auth: Auth,
    },
    {
        initialRouteName: 'IsLogin',
    }
))

export default HomeContainer