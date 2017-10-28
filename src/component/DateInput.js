import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DatePicker from 'react-native-datepicker';

export class DateInputCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: null};
  }
  render() {
    return (
      <View style={styles.host}>
        <View style={styles.container}>
          <Text style={styles.text}>วันเกิด</Text>
          <DatePicker
            date={this.state.date}
            style={{alignSelf: 'center', width: 250}}
            onDateChange={(date)=>{this.setState({date: date})}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  host: {
    height: 200,
    elevation: 2,
    borderRadius: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 40
  },
  text: {
    fontSize: 18,
    textAlignVertical: 'center'
  }
});