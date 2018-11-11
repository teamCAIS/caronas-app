import React from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';

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

  _handleFinishLoading = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    //this.props.navigation.navigate(userToken ? 'MotoristaApp' : 'Auth');
    this.props.navigation.navigate(userToken ? 'MotoristaApp' : 'PassageiroApp');
  }

  // Render any loading content that you like here
  render() {
    return (
      <AppLoading
        startAsync={this._loadResourcesAsync}
        onError={this._handleLoadingError}
        onFinish={this._handleFinishLoading}
      />
    );
  }
}