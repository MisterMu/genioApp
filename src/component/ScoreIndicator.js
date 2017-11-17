import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Progress from 'react-native-progress';
import { BrainColor } from '../../assets/color.js';
import Metrics from '../playground/config/metrics.js'

export class ScoreIndicatorCard extends React.Component {

  render() {
    // check props object has data
    if (this.props.data) {
      return (
        <View style={styles.host}>
          <ScoreIndicator color={BrainColor.MEMORY} data={this.props.data[0]}/>
          <ScoreIndicator color={BrainColor.LOGIC} data={this.props.data[1]}/>
          <ScoreIndicator color={BrainColor.CLASSIFICATION} data={this.props.data[2]}/>
          <ScoreIndicator color={BrainColor.REACTION} data={this.props.data[3]}/>
          <ScoreIndicator color={BrainColor.CONCENTRATE} data={this.props.data[4]}/>
        </View>
      );
    } else {
      console.log('IndicatorCard fail!!');
      return (null);
    }
  }
}

class ScoreIndicator extends React.Component {
  render() {
    if (this.props.data) {
      current_score = this.props.data.current_score;
      progress = (current_score == 0) ? current_score : (current_score / this.props.data.max_score);
      return (
        <View style={styles.score}>
          <Text style={[styles.text, styles.type_text]}>{this.props.data.game_type_text}</Text>
          <View style={styles.bar}>
            <Progress.Bar progress={progress} width={Metrics.DEVICE_WIDTH - 235} height={10} color={this.props.color}/>
          </View>
          <Text style={[styles.text, styles.score_text]}>{this.props.data.current_score}</Text>
        </View>
      );
    } else {
      console.log('Indicator fail!!');
      return (null);
    }
  }
}

const styles = StyleSheet.create({
  host: {
    height: 200,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 2,
    marginBottom: 15
  },
  score: {
    flex: 1,
    flexDirection: 'row'
  },
  text: {
    fontSize: 24,
    fontFamily: 'sarabun',
    textAlignVertical: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0
  },
  score_text: {
    width: 40,
    textAlign: 'center',
    right: 5
  },
  type_text: {
    width: 85,
    left: 10
  },
  bar: {
    position: 'absolute',
    top: 15,
    bottom: 0,
    left: 100
  }
});