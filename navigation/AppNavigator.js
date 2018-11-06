import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
//screens
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import PassageiroHomeScreen from '../screens/PassageiroHomeScreen';
import SignInScreen from '../screens/SignInScreen';
import CadastroScreen from '../screens/CadastroScreen';
import CaronaDetailsScreen from '../screens/CaronaDetailsScreen';
import MotoristaHomeScreen from '../screens/MotoristaHomeScreen';

const MotoristaAppStack = createStackNavigator(
  {
    MotoristaHome: MotoristaHomeScreen,
  },
  {
    initialRouteName: 'MotoristaHome'
  }
);

const PassageiroAppStack = createStackNavigator(
  {
    PassageiroHome: PassageiroHomeScreen,
    Details: CaronaDetailsScreen,
  },
  {
    initialRouteName: 'PassageiroHome'
  }
);

const MotoristaAppDrawer = createDrawerNavigator(
  {
    Inicio: MotoristaAppStack,
  },
  {
    initialRouteName: 'Inicio',
  }
)

const PassageiroAppDrawer = createDrawerNavigator(
  {
    Caronas: PassageiroAppStack,
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
    PassageiroApp: PassageiroAppDrawer,
    MotoristaApp: MotoristaAppDrawer,
  },
  {
    initialRouteName: 'Auth',
  }
);