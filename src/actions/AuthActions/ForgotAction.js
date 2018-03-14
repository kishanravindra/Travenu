import firebase from 'firebase';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FORGOT_FIELD_VALUE,
         FORGOT_IN_PROGRESS,
         FORGOT_AUTH_SUCCESS,
         FORGOT_AUTH_FAILED } from '../types';

export const forgotEmailValue = (email) => {
  console.log(`${email}`);
  return {
    type: FORGOT_FIELD_VALUE,
    payload: email
  };
};

export const sendResetPasswordRequest = (email) => {
  return (dispatch) => {
    dispatch({ type: FORGOT_IN_PROGRESS });
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => dispatch({
      type: FORGOT_AUTH_SUCCESS
    }, Alert.alert('Hurry!', 'Password reset link sent!!',
    [{ text: 'OK', onPress: () => Actions.auth({ type: 'reset' }) }])))
    .catch(error => dispatch({
      type: FORGOT_AUTH_FAILED
    }, Alert.alert(error.message)));
  };
};
