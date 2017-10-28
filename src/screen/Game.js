import React from 'react';
import { StyleSheet, View, Image, Alert, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { AppBar, Button, GameCard } from '../component';
import { BgColor } from '../assest/color.js';

export class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }
  static navigationOptions = {
    tabBarLabel: 'เกม',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../assest/icon/game_blue.png')}
        style={{tintColor: tintColor}}
      />
    ),
  };

  componentDidMount() {
    return axios.get('/game/listHighLevel/user_id/' + 3)
      .then((res) => {
        this.setState({
          isLoading: false,
          gameList: res.data.model
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator/>
        </View>
      );
    } else {
      let gameView = this.state.gameList.map((game) => {
        return <GameCard key={game.game_id} data={game}/>
      });
      return (
        <View style={styles.host}>
          <AppBar title="เกม"/>
          <ScrollView contentContainerStyle={styles.content}>
            {gameView}
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    backgroundColor: BgColor
  },
  content: {
    paddingHorizontal: 40,
    paddingVertical: 30
  }
});