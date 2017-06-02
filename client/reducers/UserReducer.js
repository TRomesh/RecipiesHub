import * as constants from '../constants/user';

const initialState = {
  isError:false,
  redireact:false,
  error:'',
  fname:'',
  lname:'',
};

export default function User(state = initialState, action) {
  switch (action.type) {
    case constants.SIGN_UP_SUCCESS:
      return Object.assign({},state,{isError:false,redireact:true});

    case constants.SIGN_UP_FAIL:
      return Object.assign({},state,{isError:true,redireact:false});

    case constants.SIGN_IN_SUCCESS:
      console.log('hureee');
      return Object.assign({},state,{isError:false,redireact:true});

    case constants.SIGN_IN_FAIL:
      return Object.assign({},state,{isError:true,redireact:false});

    case constants.GET_USER_DETAILS:
    console.log(action.data.data);
      return Object.assign({},state,{fname:action.data.data.fname,lname:action.data.data.lname});


    case constants.ERROR_GET_USER_DETAILS:
      return Object.assign({},state,{usererror:true});

    case constants.GET_USERS:
      console.log('all users',action.data.data);
      return Object.assign({},state,{users:action.data.data});

    case constants.ERROR_GET_USERS:
      return Object.assign({},state,{});

    case constants.UPDATE_USER_DETAILS:
      return Object.assign({},state,{fname:action.data.data.fname,lname:action.data.data.lname});

    case constants.ERROR_UPDATE_USER_DETAILS:
      return Object.assign({},state,{});

    default:
      return state;
  }
}
