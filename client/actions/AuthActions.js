import axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as constants from '../constants/user';

let setDataToLocalStorage=(data)=>{
  console.log('token awa');
  localStorage.setItem('jwtToken', data.data.token);
  localStorage.setItem('usr', jwtDecode(data.data.token).usr);
}

function SignIn(data) {
  return {
      type: constants.SIGN_IN_SUCCESS,
      data
  };
}

function ErrorSignIn(data) {
  return {
      type: constants.SIGN_IN_FAIL,
      data
  };
}

function SignUp(data) {
  return {
      type: constants.SIGN_UP_SUCCESS,
      data
  };
}

function ErrorSignUp(data) {
  return {
      type: constants.SIGN_UP_FAIL,
      data
  };
}

export const signUp=(userdata)=>{
  return (dispatch) => {
    return axios.post('http://localhost:3000/signup',userdata)
              .then(data => dispatch(SignUp(data)))
              .catch(error => dispatch(ErrorSignUp(error)));
        };
}


export const signIn=(credentials)=>{
  console.log('awaaa');
 return (dispatch) => {
    return axios.post('http://localhost:3000/signin',credentials)
      .then((data)=>{
            setDataToLocalStorage(data);
            dispatch(SignIn(data));
          })
       .catch(error => dispatch(ErrorSignIn(error)));
   };
}
