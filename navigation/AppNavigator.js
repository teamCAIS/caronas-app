import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import CadastroScreen from '../screens/CadastroScreen';


const AppStack = createStackNavigator({ Home: HomeScreen });
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
    App: AppStack,
    
  },
  {
    initialRouteName: 'AuthLoading',
  }
);