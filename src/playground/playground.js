import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Navigation, NavigationActions } from 'react-navigation';

import { TextColorGame } from './games/text_color.js';
import Metrics from './config/metrics.js';

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({routeName: 'Main'})
  ]
});

export class PlayGround extends React.Component {
  _exit = () => {
    this.props.navigation.dispatch(resetAction)
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