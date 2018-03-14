import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import { SIGNUP_FIELD_VALUES,
         SIGNUP_AUTH_SUCCESS,
         SIGNUP_AUTH_FAILED,
         SIGNUP_IN_PROGRESS } from '../types';

export const signUpFieldsValues = ({ prop, value }) => {
  return {
    type: SIGNUP_FIELD_VALUES,
    payload: { prop, value }
  };
};

export const sendRequestForSignup = ({ fullName, email, password }) => {
   return (dispatch) => {
     dispatch({ type: SIGNUP_IN_PROGRESS });
     firebase.auth().createUserWithEmailAndPassword(email, password)
     .then(user => {
       if (firebase.auth().currentUser) {
              const userId = firebase.auth().currentUser.uid;
               if (userId) {
                firebase.database().ref(`Users/${userId}`).set({
                   userName: fullName,
                   userEmail: email
                })
                .then(() => dispatch({
                   type: SIGNUP_AUTH_SUCCESS,
                   payload: user
                }, Alert.alert('Hurry!', 'Account created successfully!!',
                [{ text: 'OK', onPress: () => Actions.auth({ type: 'reset' }) }])));
              }
            }
     })
     .catch(error => dispatch({
       type: SIGNUP_AUTH_FAILED
     }, Alert.alert(error.message)));
   };
};
