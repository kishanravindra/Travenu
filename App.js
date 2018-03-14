import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import Router from './src/Router';
import reducers from './src/reducers';

export default class App extends React.Component {

  /*{ componentWillMount() {
  /*{ Initialize Firebase }*/
  /*{const config = {
     apiKey: 'AIzaSyDq7HPQJB5loGZQZU06RUOX-M9Tbexgw1E',
     authDomain: 'employeemanager-4abaf.firebaseapp.com',
     databaseURL: 'https://employeemanager-4abaf.firebaseio.com',
     projectId: 'employeemanager-4abaf',
     storageBucket: 'employeemanager-4abaf.appspot.com',
     messagingSenderId: '326581843840'
  };
  firebase.initializeApp(config);
}}*/

componentWillMount() {
    const config = {
      apiKey: 'AIzaSyBAuS4vmMTQd-cjn53ga3vwYuJZpfoLUZc',
      authDomain: 'qwinixer.firebaseapp.com',
      databaseURL: 'https://qwinixer.firebaseio.com',
      projectId: 'qwinixer',
      storageBucket: 'qwinixer.appspot.com',
      messagingSenderId: '527135510536'
     };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
       <Router />
      </Provider>
    );
  }
}
