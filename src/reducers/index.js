import { combineReducers } from 'redux';
import SignupReducer from './AuthReducers/SignupReducer';
import LoginReducer from './AuthReducers/LoginReducer';
import ForgotReducer from './AuthReducers/ForgotReducer';

export default combineReducers({
  loginData: LoginReducer,
  signUpData: SignupReducer,
  forgotData: ForgotReducer
});
