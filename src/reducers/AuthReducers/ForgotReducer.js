import { FORGOT_FIELD_VALUE,
         FORGOT_IN_PROGRESS,
         FORGOT_AUTH_SUCCESS,
         FORGOT_AUTH_FAILED } from '../../actions/types';

const INITIAL_STATE = { email: '', loading: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FORGOT_FIELD_VALUE:
      return {
         ...state,
         email: action.payload
      };

    case FORGOT_IN_PROGRESS:
    return {
      ...state,
      loading: true
    };

    case FORGOT_AUTH_SUCCESS: 
    return {
      ...state,
      ...INITIAL_STATE
    };

    case FORGOT_AUTH_FAILED:
    return {
      ...state,
      ...INITIAL_STATE
    };

    default:
      return state;
  }
};
