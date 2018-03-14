import React, { Component } from 'react';
import { View, Dimensions, ScrollView } from 'react-native';

export default class Home extends Component {
  render() {
    const { locationItemHeaderView,
            mainItemHeaderView,
            touristSpotItemHeaderView } = styles;
    return (
      <ScrollView>
        <View style={locationItemHeaderView} />
        <View style={mainItemHeaderView} />
        <View style={touristSpotItemHeaderView} />

      </ScrollView>
    );
  }
}

const styles = {
  locationItemHeaderView: {
    backgroundColor: '#F5000C',
    width: Dimensions.get('window').width,
    height: 40
  },

   mainItemHeaderView: {
     backgroundColor: '#61BB74',
     width: Dimensions.get('window').width,
     height: 250
  },

  touristSpotItemHeaderView: {
    backgroundColor: '#EC6907',
    width: Dimensions.get('window').width,
    height: 100
 }
};
