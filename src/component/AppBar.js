import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BorderShadow } from 'react-native-shadow';

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
    height: 48,
    alignSelf: 'stretch',
    backgroundColor: '#6781FF',
    elevation: 5
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    height: 48,
    textAlignVertical: 'center',
    color: '#fff',
    fontSize: 28
  }
});

const shadowOpt = {
  width: 360,
  color: "#000",
  border: 2,
  opacity: 0.2,
  style: {  },
  side: 'bottom',
  inset: false
}