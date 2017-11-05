import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ThemeColor } from '~/assets/color.js'

export class Button extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onPress} style={styles.btn}>
          <Text style={styles.text}>{this.props.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    alignItems: 'stretch'
  },
  btn: {
    height: 60,
    backgroundColor: ThemeColor,
    borderRadius: 5,
    elevation: 2
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 60
  }
});