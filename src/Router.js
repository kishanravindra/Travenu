import React from 'react';
import { Scene, Router, Drawer, Stack } from 'react-native-router-flux';
import Login from './screens/Auth/Login';
import SignUp from './screens/Auth/SignUp';
import Forgot from './screens/Auth/Forgot';
import Home from './screens/Main/Home';
import Profile from './screens/Main/Profile';
import Travellers from './screens/Main/Travellers';

import SideMenu from './screens/Drawer/SideMenu';

const RouterComponent = () => {
  const { navBarTitleStyle } = styles;
  return (
    <Router navigationBarStyle={{ backgroundColor: '#1A1B26' }} titleStyle={navBarTitleStyle}>
      <Scene key="root" hideNavBar >
        <Scene key="auth" hideNavBar >
           <Scene key="login" component={Login} initial />
           <Scene key="signup" component={SignUp} />
           <Scene key="forgot" component={Forgot} />
        </Scene>

        <Drawer
         hideNavBar
         key="drawer"
         contentComponent={SideMenu}
         drawerWidth={300}
         drawerImage={require('./Resources/Images/menu.png')}
        >
         <Stack>
            <Scene
             key="home" component={Home} title="Travenu" initial
             onRight={() => console.log('search pressed')}
             rightButtonImage={require('./Resources/Images/search.png')}
            />
            <Scene key="profile" component={Profile} title="My Profile" />
          </Stack>
        </Drawer>

        <Scene key="traveller"
               component={Travellers}
               hideNavBar={false}
               backTitle="Profile"
               title="Travellers"
        />

      </Scene>
    </Router>
  );
};

const styles = {
  navBarTitleStyle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Avenir-Medium'
  }
};

export default RouterComponent;
