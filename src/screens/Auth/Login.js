import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { loginFieldsValues, sendRequestForLogin, facebookLogin } from '../../actions';
import TextField from '../../components/TextField';
import Spinner from '../../components/Spinner';
import Button from '../../components/Button';

class Login extends Component {
  /*{Login btn action}*/
   OnLoginBtnPressed() {
    Keyboard.dismiss();
    const { email, password } = this.props;
    if (email.length > 0 && password.length > 0) {
         if (this.validateEmailAddress(email)) {
            console.log('Invalid');
          } else {
            /*{Send request}*/
            this.props.sendRequestForLogin({ email, password });
          }
    } else {
      this.showAlert('Oops!', 'Please enter email and password', 'OK');
    }
  }

  async onFacebookLoginBtnPressed() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('2044689182481743', {
        permissions: ['public_profile', 'email', 'user_friends'],
      });

    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
         console.log(`LoggedIn as/${response.json()}`);
         Actions.drawer({ destination: 'home' });
    } else {
      this.showAlert('Oops!', 'Please enter email and password', 'OK');
    }
}

  /*{This function helps in showing alert, act as common method}*/
  showAlert = (title, message, btnTitle) => {
    Alert.alert(
      title,
       message,
       [{ text: btnTitle, onPress: () => console.log('Ok pressed') }]
     );
  }

  /*{Validate email }*/
  validateEmailAddress = (email) => {
    console.log(email);
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      this.showAlert('Oops!', 'Invalid  email address', 'OK');
      return true;
    }
  }

  showSpinner() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button onPress={this.OnLoginBtnPressed.bind(this)}>
        Login
      </Button>
    );
  }

  render() {
    const {
      backgroundViewStyle,
      headerBgLabelStyle,
      mainTextStyle,
      subHeaderBgLabelStyle,
      subTextStyle,
      textFieldsViewStyle,
      buttonsViewStyle,
      forgotPasswordViewStyle,
      forgotTextStyle } = styles;

    return (
      <View style={backgroundViewStyle}>
          <View style={headerBgLabelStyle}>
               <Text style={mainTextStyle}> Travenu </Text>
          </View>

          <View style={subHeaderBgLabelStyle}>
               <Text style={subTextStyle}> Search.Get Best Deals.Enjoy Your Holiday </Text>
          </View>

           <View style={textFieldsViewStyle}>
               <TextField
                 placeholder={'Email'}
                 onChangeText={
                   (email) => this.props.loginFieldsValues({ prop: 'email', value: email })}
                 value={this.props.email}
               />
               <TextField
                 placeholder={'Password'}
                 onChangeText={
                   (password) =>
                   this.props.loginFieldsValues({ prop: 'password', value: password })}
                 value={this.props.password}
                 secureTextEntry
               />
          </View>

          <View style={buttonsViewStyle}>
            {this.showSpinner()}
            <Button onPress={() => Actions.signup()}>
                SignUp
            </Button>
          </View>

           <View style={forgotPasswordViewStyle}>
             <TouchableOpacity onPress={() => Actions.forgot()} style={{ width: 140 }}>
                <Text style={forgotTextStyle}>Forgot Password ?</Text>
             </TouchableOpacity>
          </View>

          <View style={subHeaderBgLabelStyle}>
               <Text style={subTextStyle}>-OR-</Text>
          </View>

          <View style={buttonsViewStyle}>
            <Button
            style={{ backgroundColor: '#2D4486' }}
            onPress={this.onFacebookLoginBtnPressed.bind(this)}
            >
                Login With Facebook
            </Button>
          </View>
      </View>
    );
  }
}

const styles = {
  backgroundViewStyle: {
    backgroundColor: '#1A1B26',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },

/*{------All View Styling-----}*/
  headerBgLabelStyle: {
    alignItems: 'center',
    marginTop: 90,
    height: 50,
    justifyContent: 'center'
  },

  subHeaderBgLabelStyle: {
    alignItems: 'center',
    marginTop: 5,
    height: 24,
    justifyContent: 'center',
  },

  textFieldsViewStyle: {
    marginTop: 45,
    alignItems: 'center',
    height: 100,
    justifyContent: 'space-around'
  },

  buttonsViewStyle: {
    marginTop: 15,
    alignItems: 'center',
    height: 100,
    justifyContent: 'space-between'
  },

  forgotPasswordViewStyle: {
    marginTop: 10,
    height: 24,
    alignItems: 'flex-end',
    paddingRight: 30
  },

/*{--------------------------}*/

  mainTextStyle: {
    fontSize: 35,
    fontFamily: 'Avenir-Medium',
    color: '#2DC2A7'
  },

  subTextStyle: {
    fontSize: 16,
    fontFamily: 'Avenir-Medium',
    color: '#2CC053'
  },

  forgotTextStyle: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Avenir-Medium'
  }
};

const mapStateToProps = state => {
  const { email, password, loading } = state.loginData;
  return { email, password, loading };
};

export default connect(mapStateToProps, { loginFieldsValues,
                                          sendRequestForLogin,
                                          facebookLogin })(Login);
