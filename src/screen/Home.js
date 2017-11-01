import React from 'react';
import { StyleSheet, View, Image, ScrollView, ActivityIndicator, AsyncStorage } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin'
import { AppBar, Button, CalendarCard, ScoreIndicatorCard } from '../component';
import { BgColor } from '../assest/color.js';

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  static navigationOptions = {
    tabBarLabel: 'หน้าหลัก',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../assest/icon/home_blue.png')}
        style={{tintColor: tintColor}}
      />
    ),
  };

  clearData = () => {
    AsyncStorage.multiRemove(['email', 'u_id'])
      .then(() => {
        GoogleSignin.signOut().then(() => alert('Data has been clear!!'));
      })
  }

  render() {
    if (!this.state.isReady) {
      AsyncStorage.multiGet(['History', 'Score'])
        .then((res) => {
          this.setState({
            isReady: true,
            history: JSON.parse(res[0][1]),
            score: JSON.parse(res[1][1])
          });
        })
        .catch(err => console.error(err));
      return (
        <View style={{flex:1, justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    } else {
      console.log('Home state', this.state);
      return (
        <View style={styles.host}>
          <AppBar title="หน้าหลัก"/>
          <ScrollView contentContainerStyle={styles.content}>
            <CalendarCard data={this.state.history}/>
            <ScoreIndicatorCard data={this.state.score}/>
            <Button onPress={this.clearData} title="บริหารสมอง"/>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 30,
    backgroundColor: BgColor,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});