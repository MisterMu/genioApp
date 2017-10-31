import React from 'react';
import { View, AsyncStorage, ActivityIndicator } from 'react-native';
import axios from 'axios';

global.email = 'tongtananut@gmail.com'

function checkEmail(email) {
  return axios.post('/user/checkEmail', { email: email });
}

function initialData(u_id) {
  return axios.post('/user/initialData', { user_id: u_id });
}

export class DataLoader extends React.Component {

  componentDidMount() {
    checkEmail(global.email)
      .then((res) => {
        global.user_id = res.data.user_id;
        AsyncStorage.setItem('user_id', res.data.user_id + '')
          .catch(err => console.error(err));
        initialData(global.user_id)
          .then((res) => {
            AsyncStorage.multiSet([
              ['History', JSON.stringify(res.data.model.history)],
              ['Score', JSON.stringify(res.data.model.score)],
              ['Games', JSON.stringify(res.data.model.game_list)]
            ])
            .catch(err => console.error(err));
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  render() {
    return (null);
  }
}