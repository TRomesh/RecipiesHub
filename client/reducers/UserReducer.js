import * as constants from '../constants/user';

const initialState = {

};

export default function User(state = initialState, action) {
  switch (action.type) {
    case constants.GET_USER_DETAILS:
      return Object.assign({},state,{});

    case constants.ERROR_GET_USER_DETAILS:
      return Object.assign({},state,{});

    case constants.GET_USERS:
      return Object.assign({},state,{});

    case constants.ERROR_GET_USERS:
      return Object.assign({},state,{});

    case constants.UPDATE_USER_DETAILS:
      return Object.assign({},state,{});

    case constants.ERROR_UPDATE_USER_DETAILS:
      return Object.assign({},state,{});

    default:
      return state;
  }
}
