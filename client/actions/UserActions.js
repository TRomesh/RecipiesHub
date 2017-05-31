import * as constants from '../constants/user';

function getUserData(data) {
  return {
      type: constants.GET_USER_DETAILS,
      data
  };
}

function ErrorgetUserData(data) {
  return {
      type: constants.ERROR_GET_USER_DETAILS,
      data
  };
}

function updateUserData(data) {
  return {
      type: constants.UPDATE_USER_DETAILS,
      data
  };
}

function ErrorupdateUserData(data) {
  return {
      type: constants.ERROR_UPDATE_USER_DETAILS,
      data
  };
}
