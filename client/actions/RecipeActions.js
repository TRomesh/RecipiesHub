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

function getMyRecipe(data) {
  return {
      type: constants.MY_RECIPES,
      data
  };
}

function ErrorgetMyRecipe(data) {
  return {
      type: constants.ERROR_MY_RECIPES,
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
  console.log('delete awa',recipe);
  return (dispatch) => {
    return axios.delete('http://localhost:3000/recipe',{ data: recipe, params: { force: true }, headers: { Authorization: "Bearer " + localStorage.getItem('jwtToken') } })
              .then(data =>dispatch(deleteRecipe(data)))
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

export const GetMyRecipe=(user)=>{
  return (dispatch) => {
    return axios.get('http://localhost:3000/myrecipe',{ params:user, headers: { Authorization:localStorage.getItem('jwtToken') } })
              .then(data => dispatch(getMyRecipe(data)))
              .catch(error => dispatch(ErrorgetMyRecipe(error)));
        };
}

export const GetAllRecipes=()=>{
  console.log('calling..........');
  return (dispatch) => {
    return axios.get('http://localhost:3000/recipes',{ headers: { Authorization:localStorage.getItem('jwtToken') } })
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
    data.append('file', file);
    data.append('filename', name);

    return (dispatch) => {
      return  axios.post('http://localhost:3000/recfile', data,{ headers: { Authorization:localStorage.getItem('jwtToken') } })
                .then(response => dispatch(uploadSuccess(response)))
                .catch(error => dispatch(uploadFail(error)))
    }
}
