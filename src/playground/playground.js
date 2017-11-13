import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { TextColorGame } from './games/text_color.js';
import Metrics from './config/metrics.js';

export class PlayGround extends React.Component {
  _exit = () => {
    console.log('playground navigate!!')
    this.props.navigation.navigate('Home')
  }

  render() {
    const { state } = this.props.navigation;
    game = [
      null,
      null,
      <TextColorGame detail={state.params.detail} exit={this._exit}/>
    ]
    return (
      <View>
        {game[state.params.detail.game_id]}
      </View>
    );
  }
}