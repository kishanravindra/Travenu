import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

import { LOGIN_FIELD_VALUES,
         LOGIN_IN_PROGRESS,
         LOGIN_AUTH_SUCCESS,
         LOGIN_AUTH_FAILED,
 } from '../types';

export const loginFieldsValues = ({ prop, value }) => {
  return {
    type: LOGIN_FIELD_VALUES,
    payload: { prop, value }
  };
};


export const sendRequestForLogin = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_IN_PROGRESS });
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => dispatch({
      type: LOGIN_AUTH_SUCCESS
    }, Actions.drawer({ destination: 'home' })))
    .catch(error => dispatch({
      type: LOGIN_AUTH_FAILED
    }, Alert.alert(error.message)));
  };
};

export const logoutRequest = () => {
  return () => {
    firebase.auth().signOut()
    .then(() => Actions.auth({ type: 'reset' }))
    .catch(error => Alert.alert(error.message));
  };
};
