import React from 'react';
import { StyleSheet, View, Image, Alert, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { AppBar, Button, ChartCard, ScoreIndicatorCard } from '../component';
import { BgColor } from '../assest/color.js';

export class ScoreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  static navigationOptions = {
    tabBarLabel: 'คะแนน',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../assest/icon/description_blue.png')}
        style={{tintColor: tintColor}}
      />
    ),
  };

  componentDidMount() {
    return axios.get('/score/list/user_id/' + 3)
      .then((res) => {
        this.setState({
          isLoading: false,
          score: res.data.model
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator/>
        </View>
      );
    } else {
      return (
        <View style={styles.host}>
          <AppBar title="คะแนน"/>
          <ScrollView contentContainerStyle={styles.content}>
            <ChartCard data={this.state.score}/>
            <ScoreIndicatorCard data={this.state.score}/>
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