import React from 'react';
import { StyleSheet, View, StatusBar, NetInfo } from 'react-native';
import axios from 'axios';
import { TabNavigator } from 'react-navigation';
import { DataLoader } from './src/component/';
import { HomeScreen, GameScreen, ScoreScreen, SettingScreen } from './src/screen/';

axios.defaults.baseURL = 'http://1101-beta.duckdns.org:8989/genio/api';

const AppNavigator = TabNavigator({
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

NetInfo.isConnected.fetch().then(isConnected => {
  console.log('First, is ' + (isConnected ? 'online' : 'offline'));
});

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <DataLoader />
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
