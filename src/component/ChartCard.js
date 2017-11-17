import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Radar } from 'react-native-pathjs-charts';

export class ChartCard extends React.Component {
  render() {
    if (this.props.data) {
      let tmp = {};
      let max_score = 0;
      this.props.data.forEach(function(obj) {
        tmp[obj.game_type_text] = obj.current_score;
        if (obj.current_score > max_score) {
          max_score = obj.current_score;
        }
      }, this);
      let data = [tmp];
      let options = {
        width: 320,
        height: 320,
        margin: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        },
        r: 120,
        max: max_score,
        fill: 'blue',
        stroke: 'lightgrey',
        label: {
          fontFamily: 'sarabun_bold',
          fontSize: 14,
          fill: 'black'
        }
      };
      return (
        <View style={styles.host}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Radar data={data} options={options}/>
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  host: {
    marginBottom: 15,
    height: 350,
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 5
  },
  title: {
    fontFamily: 'sarabun_bold',
    fontSize: 28,
    textAlign: 'center',
    paddingTop: 15
  }
});