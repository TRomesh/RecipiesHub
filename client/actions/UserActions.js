import axios from 'axios';
import * as imageconstants from '../constants/image';
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

function getAllUserData(data) {
  return {
      type: constants.GET_USERS,
      data
  };
}

function ErrorgetUserAllData(data) {
  return {
      type: constants.ERROR_GET_USERS,
      data
  };
}

export function uploadSuccess({ data }) {
  return {
    type: imageconstants.UPLOAD_PROPIC_SUCCESS,
    data,
  };
}

export function uploadFail(error) {
  return {
    type: imageconstants.UPLOAD_PROPIC_FAIL,
    error,
  };
}

export const GetUser=(username)=>{
  return (dispatch) => {
    return axios.get('http://localhost:3000/user',{ params:username, headers: { Authorization:localStorage.getItem('jwtToken') } })
              .then(data => dispatch(getUserData(data)))
              .catch(error => dispatch(ErrorgetUserData(error)));
        };
}

export const UpdateUser=(user)=>{
  return (dispatch) => {
    return axios.put('http://localhost:3000/user',user,{ headers: { Authorization:localStorage.getItem('jwtToken') } })
              .then(data => dispatch(updateUserData(data)))
              .catch(error => dispatch(ErrorupdateUserData(error)));
        };
}

export const GetUsers=()=>{
  return (dispatch) => {
    return axios.get('http://localhost:3000/users',{ headers: { Authorization:localStorage.getItem('jwtToken') } })
              .then(data => dispatch(getAllUserData(data)))
              .catch(error => dispatch(ErrorgetUserAllData(error)));
        };
}

export const uploadProPic=({ file, name })=>{
    let data = new FormData();
    data.append('file', file);
    data.append('filename', name);

    return (dispatch) => {
      return  axios.post('http://localhost:3000/usrfile', data,{ headers: { Authorization:localStorage.getItem('jwtToken')} })
                .then(response => dispatch(uploadSuccess(response)))
                .catch(error => dispatch(uploadFail(error)))
    }
}
