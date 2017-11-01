import React from 'react';
import { StyleSheet, View, Text, Button, Modal, TouchableOpacity, AsyncStorage } from 'react-native';
import DatePicker from 'react-native-datepicker';
import axios from 'axios';

export class DateInputCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: null};
  }

  registerUser = () => {
    body = {
      email:this.props.email,
      date_of_birth: this.state.date
    }
    axios.post('/user/register', body)
      .then((res) => {
        if (res.data.success) {
          console.log('register success!!')
          axios.post('/user/checkEmail', {email: this.props.email})
            .then((res) => {
              console.log('U_ID', res.data.user_id);
              AsyncStorage.setItem('u_id', res.data.user_id + '');
              this.props.done();
            })
            .catch(err => console.error(err))
        } else {
          console.log('register failed!!');
        }
      })
      .catch((err) => console.error(err))
  }

  render() {
    return (
      <View style={styles.host}>
        <View style={styles.container}>
          <Text style={styles.text}>วันเกิด</Text>
          <DatePicker
            date={this.state.date}
            style={{alignSelf: 'center', width: 250, marginBottom: 75}}
            onDateChange={(date)=>{this.setState({date: date})}}
          />
        </View>
        <TouchableOpacity onPress={this.registerUser} style={styles.saveBtn}>
          <View>
            <Text style={styles.saveTxt}> บันทึก </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    height: 400,
    marginHorizontal: 40,
    elevation: 2,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 40
  },
  text: {
    fontSize: 16,
    textAlignVertical: 'center'
  },
  saveBtn: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    padding: 8
  },
  saveTxt: {
    fontSize: 18
  }
});