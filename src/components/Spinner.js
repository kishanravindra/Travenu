import React from 'react';
import { View, ActivityIndicator } from 'react-native';


const Spinner = ({ spinnerSize }) => {
  const { spinnerViewStyle } = styles;
  return (
    <View style={spinnerViewStyle}>
     <ActivityIndicator size={spinnerSize || 'large'} color='#26A8FF' />
    </View>
  );
};

const styles = {
  spinnerViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default Spinner;
