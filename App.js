import React from 'react';
import { StyleSheet, View, Text, StatusBar, NetInfo, AsyncStorage, Modal, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

import { PlayGround } from './src/playground/playground.js'
import { DateInputCard } from './src/component/';
import { HomeScreen, GameScreen, ScoreScreen, SettingScreen } from './src/screen/';
import { BgColor } from './assets/color.js';

axios.defaults.baseURL = 'https://trewzaki-test-server.me/genio/api';

const MainAppNavigator = TabNavigator({
  Home: { screen: HomeScreen },
  Game: { screen: GameScreen },
  Score: { screen: ScoreScreen },
  Setting: { screen: SettingScreen }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    style: {
      backgroundColor: '#6781FF'
    },
    inactiveTintColor: 'white',
    activeTintColor: 'white',
    indicatorStyle: {
      backgroundColor: 'white'
    }
  }
});

const GameNavigator = StackNavigator({
  Main: { screen: MainAppNavigator },
  Playground: { screen: PlayGround }
}, {
  headerMode: 'none'
});

NetInfo.isConnected.fetch().then(isConnected => {
  console.log('First, is ' + (isConnected ? 'online' : 'offline'));
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      modalVisible: false,
      test: false
    };
  }

  closeModal = () => {
    this.setState({modalVisible: false});
  }

  openModal = () => {
    this.setState({modalVisible: true});
  }

  initialData = () => {
    console.log('test', this.state);
    axios.post('/user/initialData', { user_id: this.state.u_id})
      .then((res) => {
        AsyncStorage.multiSet([
          ['History', JSON.stringify(res.data.model.history)],
          ['Score', JSON.stringify(res.data.model.score)],
          ['Games', JSON.stringify(res.data.model.game_list)]
        ])
          .then(() => {
            this.setState({isReady: true})
          })
        console.log(res.data.model)
      })
      .catch(err => console.error(err))
    }

  componentDidMount(){
    // 1. Have u_id in storage?
    AsyncStorage.getItem('u_id')
      .then((value) => {
        // 1.a No, then get email from Google Signin
        if (value == null) {
          GoogleSignin.configure({
            webClientId: '672546647653-o1jdmpjtls8pk7kdo0o1av1j1ngfsd71.apps.googleusercontent.com',
            offlineAccess: true,
            forceConsentPrompt: true,
            accountName: ''
          })
            .then(() => {
              GoogleSignin.signIn()
                .then((user) => {
                  AsyncStorage.setItem('email', user.email);
                  this.setState({ email: user.email });
                  console.log('EMAIL', this.state.email)
                  // 2. Was this email registered?
                  axios.post('/user/checkEmail', { email: this.state.email })
                    .then((res) => {
                      console.log('SUCCESS', res.data.success)
                      // 2.a Yes, get u_id from email, get initial data, and go on Genio
                      if (res.data.success) {
                        AsyncStorage.setItem('u_id', res.data.user_id + '');
                        this.setState({u_id: res.data.user_id });
                        this.initialData();
                      }
                      // 2.b No, Launch dateinput, get DoB, get gender, registering, get initial data and go on Genio
                      else {
                        this.openModal();
                      }
                    })
                    .catch((err) => console.error(err));
                })
                .catch((err) => {
                  switch (err.code) {
                    case -5:
                      // It happens on iOS: app launched the sign in screen, but user refuses to sign in (via pressing BACK button on upper left corner)
                    case 8:
                      // It happens on android: app launched the signin dialog (for user picking his account), 
                      // but user dismisses the signin dialog **before** it shows up (either via BACK button or touching outside area of the dialog)
                    case 12501:
                      // It happens on android: app launched the signin dialog (for user picking his account),
                      // but user dismisses the signin dialog **after** it shows up (either via BACK button or touching outside area of the dialog)
        
                      // all above error codes reflect that user refused to sign in. The app should provide consequence according to your app's nature.
                      break;
                    default:
                      // other error codes means sign-in really failed, we possibly need to display some error message, or even ask user to try sign in again.
                      break;
                  }
                })
            })
            .catch(err => console.error(err));
        }
        // 1.b Yes, get initial data and go on Genio
        else {
          console.log('USER_ID', value);
          this.setState({ u_id: value });
          this.initialData();
        }
      })
      .catch(err => console.error(err))
  }

  render() {
    // AsyncStorage.removeItem('u_id').then();
    // GoogleSignin.signOut().then().catch(err => console.log(err));
    if (this.state.test) {
      return <GameNavigator/>
    }
    if (this.state.isReady === false) {
      return (
        <View style={{flex: 1}}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {return null}}
          >
            <View style={styles.modal}>
              <DateInputCard
                email={this.state.email}
                done={() => {
                  this.closeModal();
                  AsyncStorage.getItem('u_id').then((value) => {
                    this.setState({u_id: (value)});
                    this.initialData();
                  });
                }}
              />
            </View>
          </Modal>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator/>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <View style={styles.container}>
            <MainAppNavigator/>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center'
  },
  modal: {
    flex: 1,
    backgroundColor: BgColor,
    justifyContent: 'center'
  }
});
