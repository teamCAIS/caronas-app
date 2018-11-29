import React from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { getUserInfo } from '../services/ApiService';
import { Subscribe } from 'unstated';
import UserContainer from '../stores/UserContainer';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  // Fetch the token from storage then navigate to our appropriate place
  _loadResourcesAsync = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    })
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = async (updateUser) => {

    const userToken = await AsyncStorage.getItem('userToken');

    if(!userToken) {
      this.props.navigation.navigate('Auth');
      return;
    }

    const data = await getUserInfo(userToken);

    if(data==401) {
      this.props.navigation.navigate('Auth');
      return;
    }
    
    user = data[0];
    updateUser(user);

    const type = user.tipo;

    if(type == 1)
      this.props.navigation.navigate('PassageiroApp');
    else if(type == 2)
      this.props.navigation.navigate('MotoristaApp');
    else {
      this.props.navigation.navigate('Auth');
    }
      
    
  }

  // Render any loading content that you like here
  render() {
    return (
      <Subscribe to={[UserContainer]}>
        {container => (
          <AppLoading
            startAsync={this._loadResourcesAsync}
            onError={this._handleLoadingError}
            onFinish={()=> this._handleFinishLoading(container.updateUser)}
          />
        )}
      </Subscribe>
    );
  }
}