import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Metrics from './config/metrics.js'
import { BgColor, BrainColor } from '../../assets/color.js';

export class FinishedScreen extends React.Component {
  getBrainColor() {
    switch(/*this.props.detail.game_type*/ 3) {
      case 1:
        return BrainColor.MEMORY;
      case 2:
        return BrainColor.LOGIC;
      case 3:
        return BrainColor.CLASSIFICATION;
      case 4:
        return BrainColor.REACTION;
      case 5:
        return BrainColor.CONCENTRATE;
      default:
        return 'black';
    }
  }

  render() {
    brainColor = this.getBrainColor();
    console.log(this.brainColor, this.getBrainColor())
    return (
      <View style={styles.host}>
        <View style={styles.card}>
          <Text style={[styles.text_bold, styles.game_name, {color: this.getBrainColor()}]}>{this.props.detail.thai_game_name}</Text>
          <Text style={[styles.text_bold, styles.game_detail, {color: this.getBrainColor()}]}>{/*this.props.detail.game_type_text*/"การจำแนก"}, ระดับ {this.props.detail.game_level}</Text>
          <Text style={[styles.text, styles.label]}>คะแนน{/*this.props.detail.game_type_text*/"การจำแนก"}</Text>
          <Text style={[styles.text_bold, styles.point]}>+ 3</Text>
          <TouchableOpacity style={[styles.btn, {borderColor: this.getBrainColor()}]} onPress={this.props.exit}>
            <Text style={[styles.text_bold, styles.text_btn, {color: this.getBrainColor()}]}>ต่อไป</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    width: Metrics.DEVICE_WIDTH,
    height: Metrics.DEVICE_HEIGHT,
    backgroundColor: BgColor,
    alignItems: 'center'
  },
  card: {
    backgroundColor: 'white',
    elevation: 2,
    width: Metrics.DEVICE_WIDTH * 0.75,
    height: Metrics.DEVICE_HEIGHT * 0.6,
    marginVertical: Metrics.DEVICE_HEIGHT * 0.2,
    alignItems: 'center'
  },
  text_bold: {
    fontFamily: 'sarabun_bold'
  },
  text: {
    fontFamily: 'sarabun'
  },
  game_name: {
    fontSize: 60,
    marginTop: 24
  },
  game_detail: {
    fontSize: 36
  },
  label: {
    fontSize: 28,
    marginTop: 36
  },
  point: {
    fontSize: 104
  },
  btn: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 42,
    paddingVertical: 8
  },
  text_btn: {
    fontSize: 28
  }
});