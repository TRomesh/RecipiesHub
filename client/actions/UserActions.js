
function getUserData(data) {
  return {
      type: constants.GET_USER_DETAILS,
      data
  };
}

function updateUserData(data) {
  return {
      type: constants.UPDATE_USER_DETAILS,
      data
  };
}
