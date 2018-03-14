import { LOGIN_FIELD_VALUES,
         LOGIN_IN_PROGRESS,
         LOGIN_AUTH_SUCCESS,
         LOGIN_AUTH_FAILED
         } from '../../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_FIELD_VALUES:
      return {
        ...state,
        [action.payload.prop]: action.payload.value
      };

      case LOGIN_IN_PROGRESS:
      return {
        ...state,
        loading: true
      };

      case LOGIN_AUTH_SUCCESS:
       return {
         ...state,
         ...INITIAL_STATE
       };

       case LOGIN_AUTH_FAILED:
       return {
         ...state,
         ...INITIAL_STATE
       };

    default:
    return state;
  }
};
