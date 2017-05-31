import * as constants from '../constants/user';

function SignIn(data) {
  return {
      type: constants.GET_USER_DETAILS,
      data
  };
}

function ErrorSignIn(data) {
  return {
      type: constants.GET_USER_DETAILS,
      data
  };
}

function SignUp(data) {
  return {
      type: constants.GET_USER_DETAILS,
      data
  };
}

function ErrorSignUp(data) {
  return {
      type: constants.GET_USER_DETAILS,
      data
  };
}
