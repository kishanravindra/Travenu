import React, { Component } from 'react';
import { View, Text, Dimensions, Alert, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { forgotEmailValue, sendResetPasswordRequest } from '../../actions';
import TextField from '../../components/TextField';
import Spinner from '../../components/Spinner';
import Button from '../../components/Button';

class Forgot extends Component {

OnSendResetBtnPressed() {
  console.log('oh yaaaa!');
  Keyboard.dismiss();
  const { email } = this.props;
  if (email.length > 0) {
    this.props.sendResetPasswordRequest(email);
  } else {
    this.showAlert('Oops!', 'Please enter your registered email', 'OK');
  }
}

  /*{ This function helps in showing alert, act as common method }*/
  showAlert = (title, message, btnTitle) => {
    Alert.alert(
      title,
       message,
       [{ text: btnTitle, onPress: () => console.log('Ok pressed') }]
     );
  }

  /*{ Validate email }*/
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
      <Button onPress={this.OnSendResetBtnPressed.bind(this)}>
        Send Reset Password Link!
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
      infoTextStyle,
      textFieldsViewStyle,
      buttonsViewStyle,
      infoHeaderBgLabelStyle
    } = styles;

    return (
      <View style={backgroundViewStyle}>
          <View style={headerBgLabelStyle}>
               <Text style={mainTextStyle}> Travenu </Text>
          </View>

          <View style={subHeaderBgLabelStyle}>
               <Text style={subTextStyle}> Search.Get Best Deals.Enjoy Your Holiday </Text>
          </View>

          <View style={infoHeaderBgLabelStyle}>
               <Text style={infoTextStyle}> Enter your registered email address.
                So, we can send reset password link </Text>
          </View>

           <View style={textFieldsViewStyle}>
               <TextField
                 placeholder={'Email'}
                 onChangeText={email => this.props.forgotEmailValue(email)}
                 value={this.props.email}
               />
          </View>

          <View style={buttonsViewStyle}>
            {this.showSpinner()}
            <Button onPress={() => Actions.auth({ type: 'reset' })} >
                Back to login
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

  infoHeaderBgLabelStyle: {
    alignItems: 'center',
    marginTop: 30,
    height: 24,
    justifyContent: 'center',
    paddingRight: 20,
    paddingLeft: 20
  },

  textFieldsViewStyle: {
    marginTop: 20,
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

  infoTextStyle: {
    fontSize: 18,
    fontFamily: 'Avenir-Medium',
    color: '#2CC053',
    textAlign: 'center'
  },

  forgotTextStyle: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Avenir-Medium'
  }
};

const mapStateToProps = state => {
  const { email, loading } = state.forgotData;
  return { email, loading };
};

export default connect(mapStateToProps, { forgotEmailValue, sendResetPasswordRequest })(Forgot);
