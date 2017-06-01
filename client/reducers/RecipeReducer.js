import * as constants from '../constants/recipe';

const initialState = {

};

export default function Recipe(state = initialState, action) {
  switch (action.type) {
    case constants.ADD_RECIPE:
      return Object.assign({},state,{});

    case constants.ERROR_ADD_RECIPE:
      return Object.assign({},state,{});

    case constants.UPDATE_RECIPE:
      return Object.assign({},state,{});

    case constants.ERROR_UPDATE_RECIPE:
      return Object.assign({},state,{});

    case constants.REMOVE_RECIPE:
      return Object.assign({},state,{});

    case constants.ERROR_REMOVE_RECIPE:
      return Object.assign({},state,{});

    default:
      return state;
  }
}
