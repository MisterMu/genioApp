import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

export class CalendarCard extends React.Component {

  render() {
    if (this.props.data) {
      let marked = {};
      Object.keys(this.props.data).map((date) => {
        marked[date] = { selected: true }
      });

      return (
        <View style={styles.host}>
          <Calendar
            style={styles.calendar}
            hideDayNames={true}
            hideArrows={true}
            markedDates={marked}
            hideExtraDays={true}
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