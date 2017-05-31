import { combineReducers } from 'redux';
import auth from './AuthReducer';
import recipe from './RecipeReducer';
import user from './UserReducer';

export default combineReducers({
  auth,
  recipe,
  user
})
