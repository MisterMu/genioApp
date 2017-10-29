import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Radar } from 'react-native-pathjs-charts';

export class ChartCard extends React.Component {
  render() {
    if (this.props.data) {
      let tmp = {};
      this.props.data.forEach(function(obj) {
        tmp[obj.game_type_text] = obj.current_score;
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
        max: 1000,
        fill: 'blue',
        stroke: 'lightgrey',
        animate: {
          type: 'oneByOne',
          duration: 200
        },
        label: {
          fontFamily: 'Arial',
          fontSize: 14,
          fontWeight: 200,
          fill: 'black'
        }
      };
      return (
        <View style={styles.host}>
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
    flex: 1,
    elevation: 2,
    backgroundColor: 'white'
  }
});