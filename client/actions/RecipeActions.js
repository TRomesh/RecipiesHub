import * as constants from '../constants/recipe';

function addRecipe(data) {
  return {
      type: constants.ADD_RECIPE,
      data
  };
}

function ErroraddRecipe(data) {
  return {
      type: constants.ERROR_ADD_RECIPE,
      data
  };
}

function updateRecipe(data) {
  return {
      type: constants.UPDATE_RECIPE,
      data
  };
}

function ErrorupdateRecipe(data) {
  return {
      type: constants.ERROR_UPDATE_RECIPE,
      data
  };
}

function deleteRecipe(data) {
  return {
      type: constants.REMOVE_RECIPE,
      data
  };
}

function ErrordeleteRecipe(data) {
  return {
      type: constants.ERROR_REMOVE_RECIPE,
      data
  };
}

function shareRecipe(data) {
  return {
      type: constants.SHARE_RECIPE,
      data
  };
}

function ErrorshareRecipe(data) {
  return {
      type: constants.ERROR_SHARE_RECIPE,
      data
  };
}
