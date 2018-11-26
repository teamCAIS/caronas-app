import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
//screens
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import PassageiroHomeScreen from '../screens/PassageiroHomeScreen';
import SignInScreen from '../screens/SignInScreen';
import CadastroScreen from '../screens/CadastroScreen';
import CaronaDetailsScreen from '../screens/CaronaDetailsScreen';
import MotoristaHomeScreen from '../screens/MotoristaHomeScreen';
import HistoricoScreen from '../screens/HistoricoScreen';
import PerfilScreen from '../screens/PerfilScreen';
import Menu from '../components/Menu';
import EditarCaronaScreen from '../screens/EditarCaronaScreen';
import CodigoScreen from '../screens/CodigoScreen';
import CadastroFinalScreen from '../screens/CadastroFinalScreen';
import DenunciaScreen from '../screens/DenunciaScreen';
import SobreScreen from '../screens/SobreScreen';
import MenuMotorista from '../components/MenuMotorista';
import AdicionarCaronaScreen from '../screens/AdicionarCaronaScreen';

const MotoristaAppStack = createStackNavigator(
  {
    MotoristaHome: MotoristaHomeScreen,
    AdicionarCarona: AdicionarCaronaScreen,
	EditarCarona: EditarCaronaScreen,
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
    Historico: HistoricoScreen,
    Perfil: {
      screen: PerfilScreen,
    },
    Denuncia: DenunciaScreen,
    Sobre: SobreScreen,
  },
  {
    initialRouteName: 'Inicio',
    contentComponent: MenuMotorista,
  }
)

const PassageiroAppDrawer = createDrawerNavigator(
  {
    Caronas: PassageiroAppStack,
    Historico: HistoricoScreen,
    Perfil: {
      screen: PerfilScreen,
    },
    Denuncia: DenunciaScreen,
    Sobre: SobreScreen,
  },
  {
    initialRouteName: 'Caronas',
    contentComponent: Menu,
  }
);

const AuthStack = createStackNavigator(
  { 
    SignIn: SignInScreen,
    Cadastro: CadastroScreen,
    Codigo: CodigoScreen,
    CadastroFinal: CadastroFinalScreen,
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
    initialRouteName: 'AuthLoading',
  }
);