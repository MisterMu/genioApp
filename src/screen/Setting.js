import React from 'react';
import { StyleSheet, View, Image, Alert, ScrollView } from 'react-native';
import { AppBar, Button, DateInputCard } from '../component'
import { BgColor } from '../assest/color.js';

export class SettingScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'ตั้งค่า',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../assest/icon/setting_blue.png')}
        style={{tintColor: tintColor}}
      />
    ),
  };

  render() {
    return (
      <View style={styles.host}>
        <AppBar title="ตั้งค่า"/>
        <ScrollView contentContainerStyle={styles.content}>
          <DateInputCard/>
        </ScrollView>
      </View>
    );
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
  }
});