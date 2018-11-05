import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
//screens
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import CadastroScreen from '../screens/CadastroScreen';
import CaronaDetailsScreen from '../screens/CaronaDetailsScreen';

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: CaronaDetailsScreen,
  },
  {
    initialRouteName: 'Home'
  }
)

const AppDrawer = createDrawerNavigator(
  {
    Caronas: AppStack,
  },
  {
    initialRouteName: 'Caronas',
  }
);

const AuthStack = createStackNavigator(
  { 
    SignIn: SignInScreen,
    Cadastro: CadastroScreen 
  },
  {
    initialRouteName: 'SignIn',
  }
);

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: AppDrawer,
    
  },
  {
    initialRouteName: 'Auth',
  }
);