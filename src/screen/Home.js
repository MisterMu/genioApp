import React from 'react';
import { StyleSheet, View, Image, ScrollView, ActivityIndicator, AsyncStorage } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin'
import { AppBar, Button, CalendarCard, ScoreIndicatorCard } from '../component';

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
        source={require('../../assets/icons/home_blue.png')}
        style={{tintColor: tintColor}}
      />
    ),
  };

  mock_data = {
    game_discription: "เลือกความหมายให้ตรงกับสี",
    game_id: 2,
    game_level: 1,
    game_name: "Color and Meaning game",
    thai_game_name: "เกมความหมายสี"
  }

  clearData = () => {
    AsyncStorage.multiRemove(['email', 'u_id'])
      .then(() => {
        GoogleSignin.signOut()
          .then(() => alert('Data has been clear!!'))
          .catch(err => console.error(err));
      })
  }

  _navigate = () => {
    console.log('navigate!!')
    this.props.navigation.navigate('Playground', {detail: this.mock_data});
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
          <Image
            source={require('../../assets/images/app_bg.jpg')}
            style={styles.BG}
          />
          <ScrollView contentContainerStyle={styles.content}>
            <CalendarCard data={this.state.history}/>
            <ScoreIndicatorCard data={this.state.score}/>
            <Button onPress={this._navigate} title="บริหารสมอง"/>
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
    paddingTop: 30,
    paddingBottom: 15,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  BG: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});