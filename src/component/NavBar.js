import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Icons } from '../assest/icon';

export class NavBar extends React.Component {
  render() {
    _arrActive = [false, false, false, false];
    _arrActive[this.props.index] = true;
    return (
      <View style={styles.tabBar}>
        <Tab iconIndex={0} isActive={_arrActive[0]}/>
        <Tab iconIndex={2} isActive={_arrActive[1]}/>
        <Tab iconIndex={4} isActive={_arrActive[2]}/>
        <Tab iconIndex={6} isActive={_arrActive[3]}/>
      </View>
    );
  }
}

class Tab extends React.Component {
  render() {
    if (this.props.isActive) {
      return (
        <TouchableOpacity style={{flex: 1}} onPress={this.props.onPress}>
          <View style={[styles.tabContainer, styles.activeBg]}>
            <Image style={styles.image} source={Icons[this.props.iconIndex + 1]}/>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={{flex: 1}} onPress={this.props.onPress}>
          <View style={[styles.tabContainer, styles.bg]}>
            <Image style={styles.image} source={Icons[this.props.iconIndex]}/>
          </View>
        </TouchableOpacity>
      );
    }
    
  }
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 56
  },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16
  },
  image: {
    width: 24,
    height: 24
  },
  bg: {
    backgroundColor: 'white'
  },
  activeBg: {
    backgroundColor: '#6781FF'
  }
});