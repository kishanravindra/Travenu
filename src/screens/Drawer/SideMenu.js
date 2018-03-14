import React, { Component } from 'react';
import { View,
         Image,
         Dimensions,
         Text,
         TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { logoutRequest } from '../../actions';


class SideMenu extends Component {

  logoutPressed() {
    console.log('called');
    this.props.logoutRequest();
  }

  render() {
    const { backgroundViewStyle,
            imageBgViewStyle,
            menuItemBgStyle,
            menuTextStyle,
            touchAbleStyle } = styles;

    return (
       <View style={backgroundViewStyle}>
          <View style={imageBgViewStyle}>
             <Image
               style={{ width: 300, height: 200 }}
               source={require('../../Resources/Images/sideImg2.jpg')}
             />
          </View>

         <View style={menuItemBgStyle}>
             <TouchableOpacity
              onPress={() => Actions.home()}
              style={touchAbleStyle}
             >
                <Image
                   style={{ width: 20, height: 20 }}
                   source={require('../../Resources/Images/home.png')}
                />
                 <Text style={menuTextStyle}> Home </Text>
             </TouchableOpacity>
         </View>

         <View style={menuItemBgStyle}>
             <TouchableOpacity
               onPress={() => Actions.profile()}
               style={touchAbleStyle}
             >
                 <Image
                    style={{ width: 22, height: 22 }}
                    source={require('../../Resources/Images/users.png')}
                 />
                 <Text style={menuTextStyle}> My Profile </Text>
             </TouchableOpacity>
         </View>

         <View style={menuItemBgStyle}>
             <TouchableOpacity
               onPress={this.logoutPressed.bind(this)}
               style={touchAbleStyle}
             >
                 <Image
                    style={{ width: 22, height: 22 }}
                    source={require('../../Resources/Images/logout.png')}
                 />
                 <Text style={menuTextStyle}> Logout </Text>
             </TouchableOpacity>
         </View>

      </View>
    );
  }
}

const styles = {
  backgroundViewStyle: {
    backgroundColor: '#1A1B26',
    width: 300,
    height: Dimensions.get('window').height,
    position: 'absolute'
  },

 imageBgViewStyle: {
    backgroundColor: '#000',
    height: 200
  },

  menuItemBgStyle: {
    marginTop: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },

  menuTextStyle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Avenir-Medium',
  },

  touchAbleStyle: { flexDirection: 'row' }
};


export default connect(null, { logoutRequest })(SideMenu);
