import React from 'react';
import { TouchableOpacity, Text, Dimensions } from 'react-native';

const Button = (props) => {
  const { buttonBackgroundStyle, textStyle } = styles;
  return (
    <TouchableOpacity onPress={props.onPress} style={[buttonBackgroundStyle, props.style]}>
		<Text style={textStyle}>{props.children}</Text>
		</TouchableOpacity>
  );
};

const styles = {

  buttonBackgroundStyle: {
    backgroundColor: '#26A8FF',
    width: Dimensions.get('window').width - 60,
    height: 45,
    borderRadius: 22.5
  },

  textStyle: {
		alignSelf: 'center',
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
		paddingTop: 10,
		paddingBottom: 10,
    fontFamily: 'Avenir-Medium'
	},

};

export default Button;
