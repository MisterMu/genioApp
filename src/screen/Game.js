import React from 'react';
import { StyleSheet, View, Image, ScrollView, ActivityIndicator, AsyncStorage } from 'react-native';
import { AppBar, GameCard } from '../component';

export class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  static navigationOptions = {
    tabBarLabel: 'เกม',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../assets/icons/game_blue.png')}
        style={{tintColor: tintColor}}
      />
    ),
  };

  render() {
    if (!this.state.isReady) {
      AsyncStorage.getItem('Games')
        .then((resGames) => {
          this.setState({
            isReady: true,
            games: JSON.parse(resGames)
          });
        })
        .catch(err => console.error(err));
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    } else {
      console.log('Games state', this.state);
      let gameView = this.state.games.map((game) => {
        return <GameCard key={game.game_id} data={game}/>
      });
      return (
        <View style={styles.host}>
          <AppBar title="เกม"/>
          <Image
            source={require('../../assets/images/app_bg.jpg')}
            style={styles.BG}
          />
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
    flex: 1
  },
  content: {
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  BG: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});