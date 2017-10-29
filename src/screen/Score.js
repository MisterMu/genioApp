import React from 'react';
import { StyleSheet, View, Image, ScrollView, ActivityIndicator, AsyncStorage } from 'react-native';
import { AppBar, ChartCard, ScoreIndicatorCard } from '../component';
import { BgColor } from '../assest/color.js';

export class ScoreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
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

  render() {
    if (!this.state.isReady) {
      AsyncStorage.getItem('Score')
        .then((resScore) => {
          console.log('Score success!!');
          this.setState({
            isReady: true,
            score: JSON.parse(resScore)
          });
        })
        .catch(err => console.error(err));
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    } else {
      console.log('Score', this.state);
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