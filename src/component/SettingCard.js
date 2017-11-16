import React from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity } from 'react-native';

import DatePicker from 'react-native-datepicker';
import RadioForm from 'react-native-simple-radio-button';

export class SettingCard extends React.Component {
  constructor(props) {
    super(props);
    this.oldData = {
      DoB: this.props.data.DoB,
      gender: this.props.data.gender,
      privacy: this.props.data.privacy
    }
    this.state = {
      DoB: this.oldData.DoB,
      gender: this.oldData.gender,
      privacy: this.oldData.privacy
    }
  }

  render() {
    var radio_props = [
      {label: 'ชาย      ', value: 'male'},
      {label: 'หญิง', value: 'female'}
    ]
    var saveBtn;
    if (JSON.stringify(this.oldData) !== JSON.stringify(this.state)) {
       saveBtn = <TouchableOpacity
                  style={styles.saveBtn}
                  onPress={() => {
                    console.log('setting changes!!', this.state)
                  }}
                >
                  <Text style={styles.saveTxt}> บันทึก </Text>
                </TouchableOpacity>
    } else {
      saveBtn = null;
    }
    return (
      <View style={styles.host}>
        <View style={styles.container}>
          <View style={[styles.input, {flexDirection: 'column'}]}>
            <Text style={styles.label}>วันเกิด</Text>
            <DatePicker
              date={this.state.DoB}
              style={{alignSelf: 'center', width: 250}}
              onDateChange={(date)=>{this.setState({DoB: date})}}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.label}>เพศ</Text>
            <View style={{paddingLeft: 10}}>
              <RadioForm
                radio_props={radio_props}
                initial={0}
                onPress={(value) => {this.setState({gender: value})}}
                formHorizontal={true}
              />
            </View>
          </View>
          <View style={styles.input}>
            <Text style={[styles.label]}>privacy</Text>
              <Switch
                onValueChange={(value) => {
                  this.setState({privacy: value? 1:0 });
                }}
                value={this.state.privacy === 1}
              />
          </View>
          <View style={{alignItems: 'flex-end'}}>
            {saveBtn}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    paddingTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 40,
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 5
  },
  container: {
    justifyContent: 'center',
  },
  input: {
    marginBottom: 25,
    flexDirection: 'row'
  },
  label: {
    fontFamily: 'sarabun_bold',
    fontSize: 24,
    marginBottom: 5,
    width: 100
  },
  saveBtn: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    width: 80,
    marginBottom: 15
  },
  saveTxt: {
    fontFamily: 'sarabun_bold',
    fontSize: 28,
    textAlign: 'center'
  }
});