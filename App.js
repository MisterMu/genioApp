import React from 'react';
import { StyleSheet, Text, View, StatusBar, NetInfo } from 'react-native';
import { TabRouter, TabNavigator } from 'react-navigation';
import axios from 'axios';
import { HomeScreen, GameScreen, ScoreScreen, SettingScreen } from './src/screen/';

axios.defaults.baseURL = 'http://1101-beta.duckdns.org:8989/genio/api';
// axios.defaults.baseURL = 'http://10.80.65.59:100'

const AppNavigator = TabNavigator({
  Home: { screen: HomeScreen },
  Game: { screen: GameScreen },
  Score: { screen: ScoreScreen },
  Setting: { screen: SettingScreen }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    // activeTintColor: '#e91e63',
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

NetInfo.isConnected.fetch().then(isConnected => {
  console.log('First, is ' + (isConnected ? 'online' : 'offline'));
});

export default class App extends React.Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.statusBar}/>
        <View style={styles.container}>
          <AppNavigator/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center'
  },
  statusBar: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    height: StatusBar.currentHeight
  }
});
