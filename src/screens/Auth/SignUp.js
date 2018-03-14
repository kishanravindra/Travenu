import React, { Component } from 'react';
import { View, Text, Dimensions, Keyboard, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { signUpFieldsValues, sendRequestForSignup } from '../../actions';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';

class SignUp extends Component {

/*{On SignupBtn Pressed}*/
  onSignupBtnPressed() {
      Keyboard.dismiss();
      const { fullName, email, password, confirmPassword } = this.props;
      if (fullName.length > 0 && email.length > 0 &&
           password.length > 0 && confirmPassword.length > 0) {
            if (fullName.length <= 2) {
               this.showAlert('Oops!', 'Full name should contain more than 2 characters', 'OK');
            } else if (this.validateEmailAddress(email)) {
              console.log('Invalid');
            } else if (password <= 6) {
              this.showAlert('Oops!', 'Password should contain more than 6 characters', 'OK');
            } else if (password !== confirmPassword) {
              this.showAlert('Oops!', 'Password Mismatch!', 'OK');
            } else {
              /*{Send request}*/
              this.props.sendRequestForSignup({ fullName, email, password });
            }
      } else {
        this.showAlert('Oops!', 'All fields are mandatory', 'OK');
      }
  }

  async onFacebookSignupBtnPressed() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('2044689182481743', {
        permissions: ['public_profile', 'email', 'user_friends'],
      });

    if (type === 'success') {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
         console.log(`LoggedIn as/${response.json()}`);
         Actions.Main();
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
      <Button onPress={this.onSignupBtnPressed.bind(this)}>
        SignUp
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
      buttonsViewStyle } = styles;

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
                 placeholder={'Full Name'}
                 onChangeText={
                   fullName => this.props.signUpFieldsValues({ prop: 'fullName', value: fullName })
                 }
                 value={this.props.fullName}
               />
               <TextField
                 placeholder={'Email'}
                 onChangeText={
                    email => this.props.signUpFieldsValues({ prop: 'email', value: email })
                  }
                  value={this.props.email}
               />
               <TextField
                 placeholder={'Password'}
                 onChangeText={
                   password => this.props.signUpFieldsValues({ prop: 'password', value: password })
                 }
                 value={this.props.password}
                 secureTextEntry
               />
               <TextField
                 placeholder={'Confirm Password'}
                 onChangeText={
                   confirmPassword =>
                   this.props.signUpFieldsValues({ prop: 'confirmPassword',
                   value: confirmPassword })
                 }
                 value={this.props.confirmPassword}
                 secureTextEntry
               />
          </View>

          <View style={buttonsViewStyle}>
            {this.showSpinner()}
            <Button onPress={() => Actions.auth({ type: 'reset' })}>
                Login
            </Button>
          </View>

          <View style={subHeaderBgLabelStyle}>
               <Text style={subTextStyle}>-OR-</Text>
          </View>

          <View style={buttonsViewStyle}>
            <Button
            style={{ backgroundColor: '#2D4486' }}
            onPress={this.onFacebookSignupBtnPressed.bind(this)}
            >
                Signup With Facebook
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
    marginTop: 10,
    height: 24,
    justifyContent: 'center',
  },

  textFieldsViewStyle: {
    marginTop: 15,
    alignItems: 'center',
    height: 200,
    justifyContent: 'space-around'
  },

  buttonsViewStyle: {
    marginTop: 15,
    alignItems: 'center',
    height: 100,
    justifyContent: 'space-between'
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
  const { fullName, email, password, confirmPassword, user, loading } = state.signUpData;
  return {
    fullName,
    email,
    password,
    confirmPassword,
    user,
    loading
  };
};

export default connect(mapStateToProps, { signUpFieldsValues, sendRequestForSignup })(SignUp);
