import React from 'react';
import { StyleSheet, View, Image, Alert, ScrollView, AsyncStorage, ActivityIndicator } from 'react-native';
import { AppBar, Button, DateInputCard, SettingCard } from '../component'
import { BgColor } from '../../assets/color.js';

export class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DoB: null,
      gender: null,
      privacy: null,
      isReady: false
    }
  }
  static navigationOptions = {
    tabBarLabel: 'ตั้งค่า',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/icons/setting_blue.png')}
        style={{tintColor: tintColor}}
      />
    ),
  };

  componentDidMount() {
    AsyncStorage.getItem('Profile').then((val) => {
      this.setState({
        DoB: JSON.parse(val).date_of_birth,
        gender: JSON.parse(val).gender,
        privacy: JSON.parse(val).privacy_status,
        isReady: true
      });
    });
  }

  render() {
    if (this.state.isReady) {
      console.log(this.state)
      return (
        <View style={styles.host}>
          <AppBar title="ตั้งค่า"/>
          <ScrollView contentContainerStyle={styles.content}>
            <SettingCard data={this.state}/>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator/>
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
    paddingVertical: 30,
    paddingHorizontal: 40,
    backgroundColor: BgColor,
  }
});