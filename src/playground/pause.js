import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

import Metrics from './config/metrics.js';
import { BgColor } from '../../assets/color.js';

export class PauseScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: BgColor}}>
        <View style={styles.title}>
          <Text style={styles.text_title}>หยุดเกมชั่วคราว</Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={this.props.resume}>
          <Image source={require('../../assets/icons/play_circle_outline_blue.png')} style={styles.icon_btn} resizeMode={'contain'}/>
          <Text style={styles.text_btn}>เล่นเกมต่อ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={this.props.restart}>
          <Image source={require('../../assets/icons/replay_blue.png')} style={styles.icon_btn} resizeMode={'contain'}/>
          <Text style={styles.text_btn}>เริ่มเกมใหม่</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={this.props.exit}>
          <Image source={require('../../assets/icons/exit_blue.png')} style={styles.icon_btn} resizeMode={'contain'}/>
          <Text style={styles.text_btn}>กลับไปหน้าแรก</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 40
  },
  text_title: {
    fontFamily: 'sarabun',
    fontSize: 48
  },
  btn: {
    width: Metrics.DEVICE_WIDTH * 0.5,
    height: Metrics.DEVICE_HEIGHT * 0.1,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginVertical: 20,
    elevation: 2,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row'
  },
  text_btn: {
    fontFamily: 'sarabun',
    fontSize: 32,
    flex: 1,
    textAlignVertical: 'center'
  },
  icon_btn: {
    width: 24,
    height: 24,
    margin: 16
  }
});