import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from '../../components/Button';

export default class Profile extends Component {
  render() {
    const { connectTravelStyle } = styles;
    return (
      <View>
          <View style={connectTravelStyle}>
              <Button
               style={{ backgroundColor: '#2CC053' }}
               onPress={() => Actions.traveller()}  
              >
                 Connect With Travellers
              </Button>
          </View>
      </View>
    );
  }
}

const styles = {
  connectTravelStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: Dimensions.get('window').height - 140
  }
};
