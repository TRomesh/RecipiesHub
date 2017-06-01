import { combineReducers } from 'redux';
import recipe from './RecipeReducer';
import user from './UserReducer';

export default combineReducers({
  recipe,
  user
});
