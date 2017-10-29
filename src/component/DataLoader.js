import React from 'react';
import { View, AsyncStorage, ActivityIndicator } from 'react-native';
import axios from 'axios';

function getHistory(u_id) {
  body = {
    user_id: u_id,
    day: '',
    month: '',
    year: ''
  };
  return axios.post('/game/getHistory', body);
}

function getScore(u_id) {
  return axios.get('/score/list/user_id/' + u_id);
}

function getListGame(u_id) {
  return axios.get('/game/listHighLevel/user_id/' + u_id);
}

export class DataLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    axios.all([getHistory(3), getScore(3), getListGame(3)])
      .then(axios.spread((resHistory, resScore, resGames) => {
        AsyncStorage.multiSet([
          ['History', JSON.stringify(resHistory.data.model)],
          ['Score', JSON.stringify(resScore.data.model)],
          ['Games', JSON.stringify(resGames.data.model)]
        ]).then(() => {
          this.setState({
            isLoading: false
          });
        }).catch(err => console.error(err));
      }))
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, elevation: 100}}>
        <ActivityIndicator/>
      </View>
      );
    } else {
      return (null);
    }
  }
}