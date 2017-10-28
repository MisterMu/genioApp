import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { AppBar, Button, CalendarCard, ScoreIndicatorCard } from '../component';
import { Icons } from '../assest/icon';
import { BgColor } from '../assest/color.js';

function getHistory(u_id) {
  body = {
    user_id: u_id,
    day: '',
    month: '',
    year: ''
  };
  return axios.post('/game/getHistory', body);
}

function getScore(u_id) {
  return axios.get('/score/list/user_id/' + u_id);
}

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
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

  componentDidMount() {
    return axios.all([getHistory(3), getScore(3)])
      .then(axios.spread((resHistory, resScore) => {
        this.setState({
          isLoading: false,
          score: resScore.data.model,
          history: resHistory.data.model
        });
      }))
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator/>
        </View>
      );
    }
    else {
      return (
        <View style={styles.host}>
          <AppBar title="หน้าหลัก"/>
          <ScrollView contentContainerStyle={styles.content}>
            <CalendarCard data={this.state.history}/>
            <ScoreIndicatorCard data={this.state.score}/>
            <Button onPress={()=>{getScore(1)}} title="บริหารสมอง"/>
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