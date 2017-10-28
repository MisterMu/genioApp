import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

export class CalendarCard extends React.Component {

  render() {
    // check if props object has data
    if (this.props.data) {
      // retype time to YYYY-MM-DD
      date = this.props.data.map((obj) => {
        return obj.timestamp;
      }).map((obj) => {
        return obj.split(' ')[0];
      });

      // add date to marked object
      let marked = {};
      date.forEach((key) => {
        marked[key] = { selected: true }
      }, this);

      return (
        <View style={styles.host}>
          <Calendar
            style={styles.calendar}
            hideDayNames={true}
            hideArrows={true}
            markedDates={marked}
          />
        </View>
      );
    } else {
      console.log('Calendar fail!!');
      return (null);
    }
    
  }
}

const styles = StyleSheet.create({
  host: {
    height: 280
  },
  calendar: {
    borderRadius: 5,
    elevation: 2
  }
});