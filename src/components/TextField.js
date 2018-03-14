import React from 'react';
import { TextInput, Dimensions } from 'react-native';

const TextField = ({ placeholder, onChangeText, value, secureTextEntry }) => {
  const { textFieldStyle } = styles;
  return (
    <TextInput
     style={textFieldStyle}
     secureTextEntry={secureTextEntry}
     placeholder={placeholder}
     onChangeText={onChangeText}
     value={value}
    />
  );
};


const styles = {
  textFieldStyle: {
    backgroundColor: '#fff',
    height: 45,
    width: Dimensions.get('window').width - 60,
    borderRadius: 22.5,
    paddingLeft: 10
  }
};

export default TextField;
