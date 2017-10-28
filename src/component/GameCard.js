import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export class GameCard extends React.Component {
  render() {
    if (this.props.data) {
      return (
        <View style={styles.host}>
          <View style={styles.img}/>
          <View style={styles.detail}>
            <Text style={[styles.text, {textAlign: 'left'}]}>{this.props.data.thai_game_name}</Text>
            <Text style={[styles.text, {textAlign: 'right'}]}>ระดับ {this.props.data.current_level}</Text>
          </View>
        </View>
      );
    } else {
      return (null);
    }
  }

}

const styles = StyleSheet.create({
  host: {
    height: 150,
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 15
  },
  img: {
    height: 120
  },
  detail: {
    flex: 1,
    height: 30,
    flexDirection: 'row',
    borderTopColor: '#95989A',
    borderTopWidth: 1,
    paddingHorizontal: 10
  },
  text: {
    flex: 1,
    fontSize: 18,
    textAlignVertical: 'center'
  }
});