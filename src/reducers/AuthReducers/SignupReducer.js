import { SIGNUP_FIELD_VALUES,
         SIGNUP_IN_PROGRESS,
         SIGNUP_AUTH_SUCCESS,
         SIGNUP_AUTH_FAILED } from '../../actions/types';

const INITIAL_STATE = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  user: null,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP_FIELD_VALUES:
     return {
       ...state,
       [action.payload.prop]: action.payload.value
     };

     case SIGNUP_IN_PROGRESS:
     return {
       ...state,
       loading: true
     };

     case SIGNUP_AUTH_SUCCESS:
     return {
       ...state,
       ...INITIAL_STATE,
       user: action.payload,
     };

     case SIGNUP_AUTH_FAILED:
       return {
         ...state,
         loading: false,
         ...INITIAL_STATE
    };

    default:
      return state;
  }
};
