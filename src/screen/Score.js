import React from 'react';
import { StyleSheet, View, Image, ScrollView, ActivityIndicator, AsyncStorage } from 'react-native';
import { AppBar, ChartCard, ScoreIndicatorCard } from '../component';

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
        source={require('../../assets/icons/description_blue.png')}
        style={{tintColor: tintColor}}
      />
    ),
  };

  render() {
    if (!this.state.isReady) {
      AsyncStorage.multiGet(['Score', 'AgeGroupScore', 'AllGroupScore'])
        .then((res) => {
          this.setState({
            isReady: true,
            myScore: JSON.parse(res[0][1]),
            AgeGroupScore: JSON.parse(res[1][1]),
            AllGroupScore: JSON.parse(res[2][1])
          })
          console.log(this.state);
        })
        .catch(err => console.error(err));
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    } else {
      console.log('Score state', this.state);
      return (
        <View style={styles.host}>
          <AppBar title="คะแนน"/>
          <Image
            source={require('../../assets/images/app_bg.jpg')}
            style={styles.BG}
          />
          <ScrollView contentContainerStyle={styles.content}>
            <ScoreIndicatorCard data={this.state.myScore}/>
            <ChartCard data={this.state.myScore} title="คะแนนของฉัน"/>
            <ChartCard data={this.state.AgeGroupScore.score} title={"คะแนนเฉลี่ยของกลุ่มคนในช่วงอายุ " + this.state.AgeGroupScore.age_group + " ปี"}/>
            <ChartCard data={this.state.AllGroupScore} title="คะแนนเฉลี่ยของกลุ่มผู้ใช้ทั้งหมด"/>
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