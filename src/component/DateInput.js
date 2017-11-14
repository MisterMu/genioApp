import React from 'react';
import { StyleSheet, View, Text, Button, Modal, TouchableOpacity, AsyncStorage } from 'react-native';
import DatePicker from 'react-native-datepicker';
import axios from 'axios';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

export class DateInputCard extends React.Component {
  constructor(props) {
    super(props);
    var today = new Date();
    this.state = {
      date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
      gender: 'male'
    };
  }

  registerUser = () => {
    var body = {
      email:this.props.email,
      date_of_birth: this.state.date,
      gender: this.state.gender
    }
    console.log(body)
    axios.post('/user/register', body)
      .then((res) => {
        console.log('U_ID', res.data.user_id);
        AsyncStorage.setItem('u_id', res.data.user_id + '')
          .then(() => this.props.done());
      })
      .catch((err) => console.log(err))
  }

  render() {
    var radio_props = [
      {label: 'ชาย      ', value: 'male'},
      {label: 'หญิง', value: 'female'}
    ]
    return (
      <View style={styles.host}>
        <View style={styles.container}>
          <Text style={styles.text}>วันเกิด</Text>
          <DatePicker
            date={this.state.date}
            style={{alignSelf: 'center', width: 250, marginBottom: 75}}
            onDateChange={(date)=>{this.setState({date: date})}}
          />
          <Text style={styles.text}>เพศ</Text>
          <View style={{paddingLeft: 10}}>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              onPress={(value) => {this.setState({gender: value})}}
              formHorizontal={true}
            />
          </View>
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
    fontSize: 22,
    textAlignVertical: 'center',
    fontFamily: 'sarabun_bold'
  },
  saveBtn: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    padding: 8
  },
  saveTxt: {
    fontSize: 26,
    fontFamily: 'sarabun_bold',
    color: 'black'
  }
});