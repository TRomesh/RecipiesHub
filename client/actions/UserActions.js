import axios from 'axios';
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

export const GetUser=(user)=>{
  return (dispatch) => {
    return axios.get('http://localhost:3000/user',user,{ headers: { Authorization:localStorage.getItem('jwtToken') } })
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
