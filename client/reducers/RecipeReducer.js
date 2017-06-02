import * as constants from '../constants/recipe';

const initialState = {
    allrecipe:[],
    myrecipe:[],
    isError:false,
    redireact:false
};

export default function Recipe(state = initialState, action) {
  switch (action.type) {
    case constants.ADD_RECIPE:
      return Object.assign({},state,{allrecipe:action.data.data.concat(state.allrecipe)});

    case constants.ERROR_ADD_RECIPE:
      return Object.assign({},state,{isError:true});

    case constants.UPDATE_RECIPE:
      return Object.assign({},state,{allrecipe:action.data.data.concat(state.allrecipe)});

    case constants.ERROR_UPDATE_RECIPE:
      return Object.assign({},state,{isError:true});

    case constants.SEARCH_RECIPE:
    console.log('reducer data',action.data.data);
      return Object.assign({},state,{allrecipe:action.data.data});

    case constants.ERROR_SEARCH_RECIPE:
      return Object.assign({},state,{isError:true});

    case constants.REMOVE_RECIPE:
      return Object.assign({},state,{});

    case constants.ERROR_REMOVE_RECIPE:
      return Object.assign({},state,{isError:true});

    default:
      return state;
  }
}
