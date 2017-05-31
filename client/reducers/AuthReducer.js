import * as constants from '../constants/user';

const initialState = {
  isError:false,
  redireact:false
};

export default function User(state = initialState, action) {
  switch (action.type) {
    case constants.SIGN_UP_SUCCESS:
      return Object.assign({},state,{});

    case constants.SIGN_UP_FAIL:
      return Object.assign({},state,{});

    case constants.SIGN_IN_SUCCESS:
      return Object.assign({},state,{});

    case constants.SIGN_IN_FAIL:
      return Object.assign({},state,{});

    default:
      return state;
  }
}
