import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Progress from 'react-native-progress';
import { BrainColor } from '../../assets/color.js';

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
          <Text style={styles.text}>{this.props.data.game_type_text}</Text>
          <View style={{justifyContent: 'center'}}>
            <Progress.Bar progress={progress} width={200} height={10} color={this.props.color}/>
          </View>
          <Text style={styles.text}>{this.props.data.current_score}</Text>
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
    marginVertical: 10,
    borderRadius: 5,
    elevation: 2
  },
  score: {
    flex: 1,
    flexDirection: 'row'
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    textAlignVertical: 'center'
  }
});