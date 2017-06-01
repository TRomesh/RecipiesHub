import axios from 'axios';
import * as constants from '../constants/recipe';
import * as imageconstants from '../constants/image';

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

function searchRecipe(data) {
  return {
      type: constants.SEARCH_RECIPE,
      data
  };
}

function ErrorsearchRecipe(data) {
  return {
      type: constants.ERROR_SEARCH_RECIPE,
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

export function uploadSuccess({ data }) {
  return {
    type: imageconstants.UPLOAD_RECPIC_SUCCESS,
    data,
  };
}

export function uploadFail(error) {
  return {
    type: imageconstants.UPLOAD_RECPIC_FAIL,
    error,
  };
}

export const AddNewRecipe=(recipe)=>{
  return (dispatch) => {
    return axios.post('http://localhost:3000/recipe',recipe,{ headers: { Authorization:localStorage.getItem('jwtToken') } })
              .then(data => dispatch(addRecipe(data)))
              .catch(error => dispatch(ErroraddRecipe(error)));
        };
}

export const UpdateRecipe=(recipe)=>{
  return (dispatch) => {
    return axios.put('http://localhost:3000/recipe',recipe,{ headers: { Authorization: "Bearer " + localStorage.getItem('jwtToken') } })
              .then(data => dispatch(updateRecipe(data)))
              .catch(error => dispatch(ErrorupdateRecipe(error)));
        };
}

export const RemoveRecipe=(recipe)=>{
  return (dispatch) => {
    return axios.delete('http://localhost:3000/recipe',recipe,{ headers: { Authorization: "Bearer " + localStorage.getItem('jwtToken') } })
              .then(data => dispatch(deleteRecipe(data)))
              .catch(error => dispatch(ErrordeleteRecipe(error)));
        };
}

export const GetRecipe=(recipe)=>{
  return (dispatch) => {
    return axios.get('http://localhost:3000/recipe',recipe,{ headers: { Authorization:localStorage.getItem('jwtToken') } })
              .then(data => dispatch(searchRecipe(data)))
              .catch(error => dispatch(ErrorsearchRecipe(error)));
        };
}

export const GetAllRecipesTypes=(type)=>{
  return (dispatch) => {
    return axios.get('http://localhost:3000/recipes',type,{ headers: { Authorization:localStorage.getItem('jwtToken') } })
              .then(data => dispatch(searchRecipe(data)))
              .catch(error => dispatch(ErrorsearchRecipe(error)));
        };
}

export const uploadRecPic=({ file, name })=>{
    let data = new FormData();
    data.append('file', document);
    data.append('filename', name);

    return (dispatch) => {
      return  axios.post('http://localhost:3000/file', data)
                .then(response => dispatch(uploadSuccess(response)))
                .catch(error => dispatch(uploadFail(error)))
    }
}
