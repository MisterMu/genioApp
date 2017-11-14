import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BorderShadow } from 'react-native-shadow';

import Metrics from '../playground/config/metrics.js'

export class AppBar extends React.Component {
  render() {
    return (
      <View style={styles.appBar}>
          <Text style={styles.title}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appBar: {
    height: Metrics.TOP_BAR_HEIGHT,
    alignSelf: 'stretch',
    backgroundColor: '#6781FF',
    elevation: 5
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    height: Metrics.TOP_BAR_HEIGHT,
    textAlignVertical: 'center',
    color: '#fff',
    fontSize: 28,
    fontFamily: 'sarabun_bold'
  }
});
